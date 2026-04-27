import { useEffect } from "react";
import "../App.css";

import black1 from "../Images/black1.jpg";
import black2 from "../Images/black2.jpg";
import black3 from "../Images/black3.jpg";
import black4 from "../Images/black4.jpg";
import black5 from "../Images/black5.jpg";
import black6 from "../Images/black6.jpg";
import black7 from "../Images/black7.jpg";
import black8 from "../Images/black8.jpg";
import black9 from "../Images/black9.png";
import black10 from "../Images/black10.png";
import black11 from "../Images/black11.jpg";
import black12 from "../Images/black12.jpg";
import black13 from "../Images/black13.png";
import black14 from "../Images/black14.png";
import black15 from "../Images/black15.jpg";

const ImageAnimation = () => {
  useEffect(() => {
    const ASCII_CHARS = " .:-=+*#%@";
    const FONT_SIZE = 12;
    const ASCII_COLUMNS = 30;
    const STAGGER = 100;

    const measure = document.createElement("canvas").getContext("2d");
    measure.font = `${FONT_SIZE}px monospace`;

    const charW = measure.measureText("M").width;
    const charH = FONT_SIZE;
    const ASCII_ROWS = Math.floor(ASCII_COLUMNS * (charH / charW));

    document.querySelectorAll(".ascii-reveal").forEach((img, i) => {
      const canvas = document.createElement("canvas");
      img.parentElement.appendChild(canvas);

      const start = () => runEffect(img, canvas, i * STAGGER);

      if (img.complete) start();
      else img.addEventListener("load", start);
    });

    function runEffect(img, canvas, delay) {
      const grid = toAscii(img);
      setupCanvas(canvas);
      animate(canvas, grid, delay);
    }

    function toAscii(img) {
      const c = document.createElement("canvas");
      c.width = ASCII_COLUMNS;
      c.height = ASCII_ROWS;

      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, ASCII_COLUMNS, ASCII_ROWS);

      const { data } = ctx.getImageData(0, 0, ASCII_COLUMNS, ASCII_ROWS);

      const grid = [];

      for (let r = 0; r < ASCII_ROWS; r++) {
        const row = [];

        for (let c = 0; c < ASCII_COLUMNS; c++) {
          const i = (r * ASCII_COLUMNS + c) * 4;

          const brightness =
            (data[i] * 0.299 +
              data[i + 1] * 0.587 +
              data[i + 2] * 0.114) /
            255;

          const index = Math.floor(
            (1 - brightness) * (ASCII_CHARS.length - 1)
          );

          row.push(ASCII_CHARS[index]);
        }

        grid.push(row);
      }

      return grid;
    }

    function setupCanvas(canvas) {
      canvas.width = ASCII_COLUMNS * charW;
      canvas.height = ASCII_ROWS * charH;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.fillStyle = "#00ff99";
    }

    function animate(canvas, grid, delay) {
      const ctx = canvas.getContext("2d");

      setTimeout(() => {
        for (let r = 0; r < grid.length; r++) {
          for (let c = 0; c < grid[r].length; c++) {
            ctx.fillText(grid[r][c], c * charW, r * charH);
          }
        }

        // ✅ ALWAYS reveal image after drawing
        setTimeout(() => {
          canvas.parentElement.classList.add("revealed");
        }, 800);

      }, delay);
    }
  }, []);

  const images = [
    black1, black2, black3, black4, black5,
    black6, black7, black8, black9, black10,
    black11, black12, black13, black14, black15
  ];

  return (
    <section className="gallery">
      {images.map((img, i) => (
        <div className="img" key={i}>
          <img src={img} className="ascii-reveal" alt="" />
        </div>
      ))}
    </section>
  );
};

export default ImageAnimation;