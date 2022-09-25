import "./Form.css";
import "../colorCard/ColorCard.css";
import { useState } from "react";

export default function Form({ submitHandler }) {
  const [color, setColor] = useState("#cccccc");

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
        onChange={(event) => setColor(event.target.value)}
      />
      <input
        name="hex_input"
        type="text"
        value={color}
        placeholder="#cccccc"
        onChange={(event) => setColor(event.target.value)}
        className="card__box"
      />
      <button type="submit" className="card__box form__button">
        ADD
      </button>
    </form>
  );
}
