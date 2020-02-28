import { sortByModel } from "../sortByModel";

it("given an array of cars, should return sorted by model", () => {
  const cars = [
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    },
    {
      id: 3,
      manufacturer: "Ford",
      model: "F-150"
    }
  ];

  const result = sortByModel(cars);

  expect(result).toEqual([
    {
      id: 3,
      manufacturer: "Ford",
      model: "F-150"
    },
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    }
  ]);
});
