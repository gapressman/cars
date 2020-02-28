import { Car } from '../../service/CarsManager'

export const sortByModel = (cars: Car[]) =>
  cars.sort((a, b) => {
    if (a.model === b.model) {
      return 0
    }

    return a.model > b.model ? 1 : -1
  })

