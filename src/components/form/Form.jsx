import "./Form.css";
import "../colorCard/ColorCard.css";
import { useState } from "react";

export default function Form({ submitHandler }) {
  const [color, setColor] = useState("");

  function handleInput(event) {
    console.log(event.target.value);
    setColor(event.target.value);
  }

  return (
    <form
      onSubmit={submitHandler}
      style={{ backgroundColor: color }}
      className="card form"
    >
      <label for="colorPicker">Choose a color:</label>
      <input
        id="colorPicker"
        type="color"
        value={color}
        onChange={handleInput}
      />
      <input
        name="hex_input"
        type="text"
        value={color}
        placeholder="...or provide a hex-code"
        onChange={handleInput}
      />
      <button type="submit" className="card__box">
        ADD
      </button>
    </form>
  );
}
