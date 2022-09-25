import "./Form.css";
import "../colorCard/ColorCard.css";
import { useState } from "react";

export default function Form({ submitHandler }) {
  const [color, setColor] = useState("#cccccc");

  function handleInput(event) {
    setColor(event.target.value);
  }

  return (
    <form
      onSubmit={submitHandler}
      style={{ backgroundColor: color }}
      className="card form"
    >
      <label htmlFor="colorPicker">Choose a color:</label>
      <input
        id="colorPicker"
        type="color"
        className="form__colorPicker"
        value={color}
        onChange={handleInput}
      />
      <input
        name="hex_input"
        type="text"
        value={color}
        placeholder="#cccccc"
        onChange={handleInput}
        className="card__box"
      />
      <button type="submit" className="card__box form__button">
        ADD
      </button>
    </form>
  );
}
