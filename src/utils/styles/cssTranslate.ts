interface CSSTranslate {
  (x: number | string, y: number | string): string;
  x(x: number | string): string;
  y(y: number | string): string;
  dir(dir: "x" | "y" | "both", x: number, y: number): string;
}

export const cssTranslate: CSSTranslate = (
  x: number | string,
  y: number | string
) => {
  const xValue = typeof x === "number" ? `${x}px` : x;
  const yValue = typeof y === "number" ? `${y}px` : y;
  return `translate(${xValue}, ${yValue})`;
};

cssTranslate.x = (n: number | string) => {
  const value = typeof n === "number" ? `${n}px` : n;
  return `translateX(${value})`;
};

cssTranslate.y = (n: number | string) => {
  const value = typeof n === "number" ? `${n}px` : n;
  return `translateY(${value})`;
};

cssTranslate.dir = (dir: "x" | "y" | "both", x: number, y: number) => {
  switch (dir) {
    case "x":
      return cssTranslate.x(x);
    case "y":
      return cssTranslate.y(y);
    case "both":
      return cssTranslate(x, y);
  }
};
