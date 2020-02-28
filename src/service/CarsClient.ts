import { carsData } from "./CarsData";
import { Car } from "./CarsManager";

//Think local storage was the best way to persist the data
class CarsClient {
  async getCars(): Promise<Car[]> {
    const storedCars = window.localStorage.getItem("cars");

    const cars = !!storedCars ? JSON.parse(storedCars!) : carsData;
    return new Promise(resolve => {
      resolve(cars);
    });
  }

  async saveCars(cars: Car[]): Promise<void> {
    Promise.resolve(window.localStorage.setItem("cars", JSON.stringify(cars)));
  }
}

export const carsClient = new CarsClient();
