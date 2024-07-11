/*
|-------------------------------------------------------------------------------
| block 色块
|-------------------------------------------------------------------------------
|
|
*/

export const blockColors = [
  "#f87171",
  "#fbbf24",
  "#4ade80",
  "#38bdf8",
  "#a78bfa",
  "#e879f9",
  "#fb923c",
  "#facc15",
  "#a3e635",
  "#34d399",
  "#2dd4bf",
  "#22d3ee",
  "#60a5fa",
  "#818cf8",
  "#c084fc",
  "#f472b6",
  "#fb7185",
];

export function createBlockColorsStyle() {
  const style = document.createElement("style");
  style.textContent = blockColors
    .map((color, i) => {
      return `.block:nth-child(${i + 1}) {
          background-color: ${color};
        }`;
    })
    .join("");
  document.head.appendChild(style);
}
