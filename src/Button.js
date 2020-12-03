import React, { useRef, useState } from "react";
import "./App.css";

function Button({ text, onClick }) {
  return (
    <div className="ButtonContainer">
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

export default Button;
