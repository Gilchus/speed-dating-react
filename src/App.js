import React, { useRef, useState } from "react";
import "./App.css";
import Button from "./Button";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [inputText, setInputText] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  let content = null;
  if (!sessionStarted) {
    content = (
      <div>
        <UserList users={users} />
        <input
          onChange={handleTextChange}
          value={inputText}
          placeholder="Type name"
        ></input>
        <Button
          text="Add User"
          onClick={() => {
            users.push(inputText);
            setInputText("");
            console.log(users);
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
  }

  return (
    <div className="App">
      <h1>Speed Dating for Founders</h1>
      {content}
    </div>
  );
}

export default App;
