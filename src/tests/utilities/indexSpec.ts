import path from "path";
import { resize, getImagePath } from "./../../utilities";

describe("Test resize function", () => {
    it("should be valid", () => {
  const input = getImagePath('fjord.jpg');

        expect(resize(input, {width: 300, height: 300})).toBeTruthy();
    });
});
