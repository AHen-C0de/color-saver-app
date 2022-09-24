import "./App.css";
import Form from "./components/form/Form.jsx";
import ColorCard from "./components/colorCard/ColorCard.jsx";
import colorDB from "./savedColors";
import { useState } from "react";

function App() {
  const [savedColors, setSavedColors] = useState(colorDB);

  function copyColorCodeToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Copied color code to Clipboard!");
      },
      () => {
        alert("Copy to Clipboard failed!");
      }
    );
  }

  function sendForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newColor = {
      id: Math.random() + "",
      colorCode: data.hex_input,
    };

    const newSavedColors = [...savedColors]; // create new color object
    newSavedColors.push(newColor); // push color object into color state array

    setSavedColors(newSavedColors); // change color state with new array
    event.target.reset();
  }

  return (
    <div className="App">
      <Form submitHandler={sendForm} />

      <div className="colorCards-wrapper">
        {savedColors.map(({ id, colorCode }) => (
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
