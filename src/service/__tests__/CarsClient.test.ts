import { carsClient } from "../CarsClient";
import { carsData } from "../CarsData";
import { Car } from "../CarsManager";

jest.spyOn(window.localStorage.__proto__, "getItem");

afterEach(() => {
  jest.resetAllMocks();
});

it("given getCars is called and localStorage is not set, should return array of cars", async () => {
  window.localStorage.getItem = jest.fn().mockReturnValue(undefined);

  const result = await carsClient.getCars();

  expect(result).toEqual(carsData);
});

it("given getCars is called and localStorage is set, should cars in localStorage", async () => {
  const cars: Car[] = [
    {
      id: 1,
      model: "foo",
      manufacturer: "bar"
    }
  ];

  window.localStorage.__proto__.getItem = jest
    .fn()
    .mockReturnValue(JSON.stringify(cars));

  const result = await carsClient.getCars();

  expect(result).toEqual(cars);
});
