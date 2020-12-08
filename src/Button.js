import React, { useRef, useState } from "react";
import "./App.css";

function Button({ text, onClick, type, disabled }) {
  return (
    <div className="ButtonContainer">
      <button onClick={onClick} type={type} disabled={disabled}>{text}</button>
    </div>
  );
}

export default Button;
