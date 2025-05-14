// Функція для розрахунку параметрів прямокутного трикутника
type TriangleType =
  | "leg"
  | "hypotenuse"
  | "adjacent angle"
  | "opposite angle"
  | "angle";

function triangle(
  value1: number,
  type1: TriangleType,
  value2: number,
  type2: TriangleType
): string {
  console.log(`>> triangle(${value1}, "${type1}", ${value2}, "${type2}");`);

  const toRadians = (angle: number) => (Math.PI / 180) * angle;
  const toDegrees = (radians: number) => (180 / Math.PI) * radians;

  let a: number = 0,
    b: number = 0,
    c: number = 0;
  let alpha: number = 0,
    beta: number = 0;

  if (value1 <= 0 || value2 <= 0) {
    console.log('"Zero or negative input"');
    return "failed";
  }

  // Визначення сторін та кутів залежно від типів аргументів
  const params = new Map([
    [type1, value1],
    [type2, value2],
  ]);

  if (params.has("leg") && params.has("hypotenuse")) {
    a = params.get("leg")!;
    c = params.get("hypotenuse")!;
    if (a >= c) {
      console.log(
        "Error: Leg cannot be greater than or equal to the hypotenuse."
      );
      return "failed";
    }
    b = Math.sqrt(c * c - a * a);
    alpha = toDegrees(Math.asin(a / c));
    beta = 90 - alpha;
  } else if (params.has("leg") && params.has("adjacent angle")) {
    a = params.get("leg")!;
    alpha = params.get("adjacent angle")!;
    b = a * Math.tan(toRadians(alpha));
    c = Math.sqrt(a * a + b * b);
    beta = 90 - alpha;
  } else if (params.has("leg") && params.has("opposite angle")) {
    a = params.get("leg")!;
    beta = params.get("opposite angle")!;
    b = a / Math.tan(toRadians(beta));
    c = Math.sqrt(a * a + b * b);
    alpha = 90 - beta;
  } else if (params.has("hypotenuse") && params.has("angle")) {
    c = params.get("hypotenuse")!;
    alpha = params.get("angle")!;
    a = c * Math.sin(toRadians(alpha));
    b = c * Math.cos(toRadians(alpha));
    beta = 90 - alpha;
  } else {
    console.log(
      "Error: Invalid input combination. Please check the instructions."
    );
    return "failed";
  }

  console.log(` a = ${a.toFixed(6)}`);
  console.log(` b = ${b.toFixed(12)}`);
  console.log(` c = ${c.toFixed(6)}`);
  console.log(` alpha = ${alpha.toFixed(12)}`);
  console.log(` beta = ${beta.toFixed(12)}`);
  console.log('"success"');
  return "success";
}

// Тестові виклики функції
triangle(7, "leg", 18, "hypotenuse");
triangle(60, "opposite angle", 5, "leg");
triangle(43.13, "angle", -2, "hypotenuse");
