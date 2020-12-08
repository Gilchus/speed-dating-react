import React, { useRef, useState } from "react";
import "./App.css";

function Button({ text, onClick, type }) {
  return (
    <div className="ButtonContainer">
      <button onClick={onClick} type={type}>{text}</button>
    </div>
  );
}

export default Button;
