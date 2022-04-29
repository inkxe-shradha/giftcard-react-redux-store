import { randomColorGenerator } from "../randomColorGenerator";

it("Should be generate a random color", () => {
  const color = randomColorGenerator();
  expect(color).toBeTruthy();
});
