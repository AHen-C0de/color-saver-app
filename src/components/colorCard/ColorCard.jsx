import "./ColorCard.css";

export default function ColorCard({ color, clickHandler }) {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <p className="name">Name</p>
      <button className="card__box" onClick={clickHandler}>
        {color}
      </button>
    </div>
  );
}
