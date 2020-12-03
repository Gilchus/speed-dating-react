import React, { useRef, useState } from 'react';
import './App.css';

function Button({onClick}) {

  return (
    <div className="ButtonContainer">
      <button onClick={onClick}>Add user</button>
    </div>
  );
}

export default Button;