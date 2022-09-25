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
  const [initialColor, filler] = useState(color);

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
        onChange={(event) => setCardColor(event.target.value)}
        onClick={(event) => event.stopPropagation()}
        onBlur={() =>
          // onBlur -> loose focus
          // update savedColors only, if cardColor was changed
          cardColor !== initialColor && clickOutOfInput(id, cardColor)
        }
      />
    </div>
  );
}
