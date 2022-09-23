import "./App.css";
import ColorCard from "./components/colorCard/ColorCard.jsx";
import colorDB from "./savedColors";

function App() {
  function copyColorCodeToClipboard(text) {
    console.log(text);

    navigator.clipboard.writeText(text).then(
      () => {
        alert("Copied color code to Clipboard!");
      },
      () => {
        alert("Copy to Clipboard failed!");
      }
    );
  }

  return (
    <div className="App">
      <div className="colorCards-wrapper">
        {colorDB.map(({ id, colorCode }) => (
          <ColorCard
            key={id}
            color={colorCode}
            clickHandler={() => copyColorCodeToClipboard(colorCode)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
