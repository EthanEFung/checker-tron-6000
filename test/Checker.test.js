const Checker = require("../models/Checker");
describe("Checker", function() {
  it("should have a side", function() {
    const test = new Checker("black");
    expect(test.side).toBe("black");
  });
  it("should indicate if kinged", function() {
    const test = new Checker("black");
    expect(test.isKing).toBe(false);
  });
});
