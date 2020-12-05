import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./Button";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([
    "simon",
    "leni",
    "luis",
    "lukas",
    "sigii",
    "sven",
  ]);
  const [inputText, setInputText] = useState("");
  const [inputErrorText, setInputErrorText] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  console.log(sessionData);

  useEffect(() => {
    if (sessionStarted) {
      console.log("use effect");
      const matchings = [];
      for (let i = 0; i < users.length / 2; i++) {
        let userA = users[Math.floor(Math.random() * users.length)];

        while (
          matchings.find((matching) => {
            if (matching.userA == userA || matching.userB == userA) return true;
          })
        ) {
          userA = users[Math.floor(Math.random() * users.length)];
        }

        let userB = users[Math.floor(Math.random() * users.length)];

        while (
          userA == userB ||
          matchings.find((matching) => {
            if (matching.userA == userB || matching.userB == userB) return true;
          })
        ) {
          userB = users[Math.floor(Math.random() * users.length)];
        }

        matchings.push({ userA: userA, userB: userB });
      }
      setSessionData({ round: 1, matchings: matchings });
    }
  }, [sessionStarted]);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  let content = null;
  if (!sessionStarted) {
    const inputErrorContent =
      inputErrorText != null ? (
        <p className="InputError">{inputErrorText}</p>
      ) : null;
    content = (
      <div>
        <h2 className="UserCounter">Users: {users.length}</h2>
        <UserList users={users} />
        <input
          onChange={handleTextChange}
          value={inputText}
          placeholder="Type name"
        ></input>
        {inputErrorContent}
        <Button
          text="Add User"
          onClick={() => {
            if (!users.includes(inputText)) {
              users.push(inputText);
              setInputText("");
              console.log(users);
              setInputErrorText("");
            } else {
              setInputErrorText("User " + inputText + " is already added!");
              setInputText("");
            }
          }}
        ></Button>
        <Button
          text="Start Session"
          onClick={() => {
            setSessionStarted(true);
          }}
        ></Button>
      </div>
    );
  } else if (sessionStarted) {
    let matchingsContent = null;
    if (sessionData) {
      matchingsContent = sessionData.matchings.map((matching) => (
        <p className="MatchingsList" key={matching}>
          {matching.userA}-{matching.userB}
        </p>
      ));
    }
    content = <div>{matchingsContent}</div>;
  }

  return (
    <div className="App">
      <h1>Speed Dating for Founders</h1>
      {content}
    </div>
  );
}

export default App;
