import { sortByModel } from "../ui/helpers/sortByModel";
import { carsClient } from "./CarsClient";

//Pretending there are real api calls a little bit.  I considered having a timeout and faking loading, but decided against.
class CarsManager {
  async getCars(): Promise<Car[]> {
    const cars = (await carsClient.getCars()).map(car => {
      return {
        ...car,
        model: car.model.toUpperCase()
      };
    });

    return Promise.resolve(sortByModel(cars));
  }

  async saveCars(cars: Car[]) {
    carsClient.saveCars(cars);
  }
}

export const carsManager = new CarsManager();

export interface Car {
  id: number;
  manufacturer: string;
  model: string;
}
