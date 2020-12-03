import React, { useRef, useState } from 'react';
import './App.css';
import Button from './Button';
import UserList from './UserList';

function App() {
const [users, setUsers] = useState([]);
const [inputText, setInputText] = useState("");

const handleTextChange=(event)=>{
  setInputText(event.target.value);
};

  return (
    <div className="App">
      <UserList users={users} />
      <input  onChange={handleTextChange} 
              value={inputText} 
              placeholder="Type name">
              </input>
      <Button onClick={()=> {
        users.push(inputText);
        setInputText("");
        console.log(users);
      }}> </Button>
    </div>
  );
}

export default App;
