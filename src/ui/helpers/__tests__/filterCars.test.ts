import { filterCars } from "../filterCars";
import { Car } from '../../../service/CarsManager';

it("given an array of cars and a search term, returns cars matching search term", () => {
  const cars: Car[] = [
    {
      id: 1,
      manufacturer: "toyota",
      model: "camry"
    },
    {
      id: 2,
      manufacturer: "ford",
      model: "mustang"
    }
  ];

  const result = filterCars(cars, "toy");

  expect(result).toEqual([{ id: 1, manufacturer: "toyota", model: "camry" }]);
});

it("given an array of cars and a search term with different case, returns cars matching search term", () => {
  const cars: Car[] = [
    {
      id: 1,
      manufacturer: "toyota",
      model: "camry"
    },
    {
      id: 2,
      manufacturer: "ford",
      model: "mustang"
    }
  ];

  const result = filterCars(cars, "TOY");

  expect(result).toEqual([{ id: 1, manufacturer: "toyota", model: "camry" }]);
});

it("given an array of cars and no search term, returns all cars", () => {
  const cars: Car[] = [
    {
      id: 1,
      manufacturer: "toyota",
      model: "camry"
    },
    {
      id: 2,
      manufacturer: "ford",
      model: "mustang"
    }
  ];

  const result = filterCars(cars, "");

  expect(result).toEqual(cars);
});
