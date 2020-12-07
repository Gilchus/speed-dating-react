import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./Button";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([
    
  ]);
  const [inputText, setInputText] = useState("");
  const [inputErrorText, setInputErrorText] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [sessionData, setSessionData] = useState({rounds: []});
  console.log(sessionData);

  useEffect(() => {
    if (currentRound != 0) {
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

        const userAlreadyMatched = (userB, matchings)=> {return matchings.find((matching) => {
          if (matching.userA == userB || matching.userB == userB) return true;
        })}

        const matchingsMap = new Map();
        for (const user of users) {
          if (user == userA) continue;
          if (userAlreadyMatched(user, matchings)) continue;
          let matchingCount = 0;
          for (const round of sessionData.rounds) {
            for (const matching of round.matchings) {
              if ((matching.userA == userA && matching.userB == user) || (matching.userA == user && matching.userB == userA)) {
                matchingCount++;
                break;
              }
            }
          }
          matchingsMap.set(user, matchingCount);
        }

        console.log("matching " + userA)

        console.log(matchingsMap);

        let minValue = Number.MAX_VALUE;
        for (const v of matchingsMap.values()) {
          if (v < minValue) {
            minValue = v;
          }
        }

        const relevantUsers = [];

        for (const u of matchingsMap.keys()) {
          if (matchingsMap.get(u) == minValue) {
            relevantUsers.push(u);
          }
        }

        let userB = relevantUsers[Math.floor(Math.random() * relevantUsers.length)];
  
        console.log("Matched " + userB)

        matchings.push({ userA: userA, userB: userB });
      }
      const round = {number: currentRound, matchings}
      const rounds = sessionData.rounds;
      rounds.push(round);
      setSessionData({ rounds });
    }
  }, [currentRound]);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  let content = null;
  if (currentRound == 0) {
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
            setCurrentRound(1);
          }}
        ></Button>
      </div>
    );
  } else {
    let matchingsContent = null;
    const currentRoundObject = sessionData.rounds.find((round)=> {return round.number == currentRound})
    
    if (currentRoundObject) {
    
      matchingsContent = currentRoundObject.matchings.map((matching, index) => (
        <p className="MatchingsList" key={matching.userA + matching.userB}>
          {index + 1}: {matching.userA}-{matching.userB}
        </p>
      ));
    }
    content = <div>{matchingsContent}
    <Button
          text="Next Round"
          onClick={() => {
            setCurrentRound(currentRound + 1);
          }}
        ></Button></div>;
  }

  return (
    <div className="App">
      <h1>Speed Dating for Founders</h1>
      {content}
    </div>
  );
}

export default App;
