import "./ColorCard.css";
import { useEffect, useState } from "react";

export default function ColorCard({
  id,
  color,
  clickOnCard,
  clickDelete,
  clickOutOfInput,
}) {
  const [cardColor, setCardColor] = useState(color);
  const [colorName, setColorName] = useState("");
  const [initialColor, filler] = useState(color);

  useEffect(() => {
    async function fetchColorName(colorCode) {
      const response = await fetch(
        `https://www.thecolorapi.com/id?hex=${colorCode.substring(1)}`
      ); // subString() ->remove '#' from color code
      const data = await response.json();
      setColorName(data.name.value);
    }
    fetchColorName(cardColor);
  }, [cardColor]);

  return (
    <div
      onClick={clickOnCard}
      className="card"
      style={{ backgroundColor: cardColor }}
    >
      <button onClick={clickDelete} className="card__delete-button">
        ✕
      </button>
      <p className="name">{colorName}</p>
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
