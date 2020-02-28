import { carsClient } from "../CarsClient";
import { carsManager } from "../CarsManager";

jest.spyOn(carsClient, "getCars").mockResolvedValue([
  {
    id: 1,
    manufacturer: "ford",
    model: "f-150"
  },
  {
    id: 2,
    manufacturer: "nissan",
    model: "ultima"
  },
  {
    id: 3,
    manufacturer: "toyota",
    model: "camry hybrid"
  }
]);

jest.spyOn(carsClient, "saveCars");

it("given getCars is called, should return cars with model capitalized ", async () => {
  const result = await carsManager.getCars();

  expect(result).toEqual([
    {
      id: 1,
      manufacturer: "ford",
      model: "F-150"
    },
    {
      id: 2,
      manufacturer: "nissan",
      model: "ULTIMA"
    },
    {
      id: 3,
      manufacturer: "toyota",
      model: "CAMRY HYBRID"
    }
  ]);
});

it("given saveCars is called, carsClients saveCars should be called with the cars", async () => {
  await carsManager.saveCars([
    {
      id: 3,
      manufacturer: "toyota",
      model: "CAMRY HYBRID"
    },
    {
      id: 1,
      manufacturer: "ford",
      model: "F-150"
    },
    {
      id: 2,
      manufacturer: "nissan",
      model: "ULTIMA"
    }
  ]);

  expect(carsClient.saveCars).toHaveBeenCalledWith([
    {
      id: 3,
      manufacturer: "toyota",
      model: "CAMRY HYBRID"
    },
    {
      id: 1,
      manufacturer: "ford",
      model: "F-150"
    },
    {
      id: 2,
      manufacturer: "nissan",
      model: "ULTIMA"
    }
  ]);
});
