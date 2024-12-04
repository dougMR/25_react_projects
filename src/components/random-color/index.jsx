// random color generator
import { useState, useRef } from "react";
import "./style.css";

const RandomColor = () => {
    const changeFormatButtonRef = useRef(null);
    const [colorFormat, setColorFormat] = useState("hex");
    const [color, setColor] = useState("#000000");

    const randomNumberUtility = (range) => {
        return Math.floor(Math.random() * range);
    };

    const hexToRgb = (hexString) => {
        // console.log("hexToRgb()");
        // Remove the # if present
        const hex = hexString.replace("#", "");

        // Check if it's a 3-digit hex code
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((char) => char + char)
                .join("");
        }

        // Parse the hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgb(${r},${g},${b})`;
    };

    const rgbToHex = (rgbString) => {
        // console.log("rgbToHex()");
        // get separate r, g, b values from rgbString
        let rgb = rgbString.slice(
            rgbString.indexOf("(") + 1,
            rgbString.indexOf(")")
        );
        rgb = rgb.replace(/^\s+|\s+$/gm, "");
        const rgbAr = rgb.split(",");
        let r = rgbAr[0];
        let g = rgbAr[1];
        let b = rgbAr[2];
        r = `${r.length < 2 ? "0" : ""}${Number(r).toString(16)}`;
        g = `${g.length < 2 ? "0" : ""}${Number(g).toString(16)}`;
        b = `${b.length < 2 ? "0" : ""}${Number(b).toString(16)}`;
        return `#${r.toUpperCase()}${g.toUpperCase()}${b.toUpperCase()}`;
    };

    const generateHexColor = () => {
        // console.log("generateHexColor()");
        const hexValuesString = "0123456789ABCDEF";
        let hexString = "#";
        for (let iteration = 0; iteration < 6; iteration++) {
            hexString += hexValuesString.charAt(
                randomNumberUtility(hexValuesString.length)
            );
        }
        return hexString;
    };
    const generateRgbColor = () => {
        const r = randomNumberUtility(256);
        const g = randomNumberUtility(256);
        const b = randomNumberUtility(256);
        return `rgb(${r},${g},${b})`;
    };

    const generateRandomColor = () => {
        let colorString = "";
        if (colorFormat === "hex") {
            colorString = generateHexColor();
        } else if (colorFormat === "RGB") {
            colorString = generateRgbColor();
        }
        setColor(colorString);
    };

    const changeColorFormat = () => {
        const oldFormat = colorFormat.toUpperCase();
        const newColorFormat = colorFormat === "hex" ? "RGB" : "hex";
        setColorFormat(newColorFormat);
        changeFormatButtonRef.current.innerText = `change to ${oldFormat}`;
        setColor(oldFormat === "HEX" ? hexToRgb(color) : rgbToHex(color));
    };

    return (
        <div className="container" style={{ backgroundColor: color }}>
            <button onClick={changeColorFormat} ref={changeFormatButtonRef}>
                change to RGB
            </button>
            <button onClick={generateRandomColor}>
                Generate Random {colorFormat.toUpperCase()} Color
            </button>
            <div className="color-name-display">
                <h3>{colorFormat}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    );
};

export default RandomColor;
