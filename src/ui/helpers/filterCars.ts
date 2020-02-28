import { Car } from '../../service/CarsManager';


export const filterCars = (cars: Car[], searchTerm: string) =>
  cars.filter(car => {
    return Object.values(car)
      .join(" ")
      .toUpperCase()
      .includes(searchTerm.toUpperCase());
  });
