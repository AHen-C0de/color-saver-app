import "./App.css";
import Form from "./components/form/Form.jsx";
import ColorCard from "./components/colorCard/ColorCard.jsx";
import colorDB from "./savedColors";
import { useEffect, useState } from "react";

function App() {
  const [savedColors, setSavedColors] = useState(
    () => JSON.parse(localStorage.getItem("savedColors")) ?? colorDB
  );

  useEffect(() => {
    localStorage.setItem("savedColors", JSON.stringify(savedColors));
  }, [savedColors]); // -> dependency array -> trigger useEffect every time, state 'savedColors' is updated

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

  function checkValidHexInput(colorCode) {
    // colorCode = string input of hex color code
    // a) check valid hex code format
    if (
      !colorCode.startsWith("#") ||
      (colorCode.length !== 4 && colorCode.length !== 7)
    ) {
      alert("Invalid hex code! Give '#xxx' or '#xxxxxx'.");
      return false;
    }

    // b) check wether new code doesnt already exist
    let dublicate = false;
    savedColors.forEach((color) => {
      if (color.colorCode === colorCode) {
        dublicate = true;
      }
    });

    if (dublicate) {
      alert("Color already exists!");
      return false;
    } else {
      return true; // good to go, valid input :)
    }
  }

  function updateColor(id, newColorCode) {
    const valid = checkValidHexInput(newColorCode);
    if (valid) {
      const updatedSavedColors = savedColors.map((color) => {
        return color.id === id ? { ...color, colorCode: newColorCode } : color;
      });
      setSavedColors(updatedSavedColors);
      console.log("colors updated");
    } else {
      console.log("FAKE colors update");
      setSavedColors([...savedColors]); // RE-RENDER DOESNT WORK !!!!!!!! :(
    }
  }

  function deleteCard(event, id) {
    const newSavedColors = savedColors.filter((color) => color.id !== id); // filter out to-delete card using its id, when mapped in render
    setSavedColors(newSavedColors); // change color state with new array
    event.stopPropagation(); // stop bubbling (triggering events up and down nodes)
  }

  function sendForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newColorCode = data.hex_input;

    const valid = checkValidHexInput(newColorCode);
    if (valid) {
      const newColor = {
        id: Math.random() + "",
        colorCode: data.hex_input,
      };

      const newSavedColors = [...savedColors]; // create new color object
      newSavedColors.unshift(newColor); // push color object into color state array
      setSavedColors(newSavedColors); // change color state with new array

      event.target.reset();
      event.stopPropagation(); // stop bubbling (triggering events up and down nodes)
    }
  }

  return (
    <div className="App">
      <Form submitHandler={sendForm} />

      <div className="App__colorCards-wrapper">
        {savedColors.map(({ id, colorCode }) => (
          <ColorCard
            key={id}
            id={id}
            color={colorCode}
            clickOnCard={() => copyColorCodeToClipboard(colorCode)}
            clickDelete={(event) => deleteCard(event, id)}
            clickOutOfInput={updateColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
