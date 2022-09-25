import "./ColorCard.css";
import { useState } from "react";

export default function ColorCard({
  id,
  color,
  clickOnCard,
  clickDelete,
  clickOutOfInput,
}) {
  const [cardColor, setCardColor] = useState(color);

  function handleInput(event) {
    setCardColor(event.target.value);
  }

  return (
    <div
      onClick={clickOnCard}
      className="card"
      style={{ backgroundColor: cardColor }}
    >
      <button onClick={clickDelete} className="card__delete-button">
        x
      </button>
      <p className="name">Name</p>
      <input
        className="card__box"
        value={cardColor}
        onChange={handleInput}
        onClick={(event) => event.stopPropagation()}
        onBlur={() => clickOutOfInput(id, cardColor)}
      />
    </div>
  );
}
