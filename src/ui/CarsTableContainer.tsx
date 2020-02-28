import * as React from "react";
import { CarsTable } from "./CarsTable";
import { carsManager, Car } from "../service/CarsManager";
import { filterCars } from "./helpers/filterCars";
import { sortByModel } from "./helpers/sortByModel";

export class CarsTableContainer extends React.Component<
  {},
  CarsTableContainerState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isReverseSort: false,
      //I over engineered this, if I did it again I'd make the entire row editable and now worry about the cell
      editableCell: { id: -1 },
      editText: "",
      searchTerm: "",
      cars: []
    };
  }

  async componentDidMount() {
    const cars = await carsManager.getCars();

    this.setState({ cars });
  }

  handleSortClick = () => {
    this.setState({ isReverseSort: !this.state.isReverseSort });
  };

  handleEditClick = (id: number, cellName: CellNames, currentText: string) => {
    this.setState({ editableCell: { id, cellName }, editText: currentText });
  };

  handleEditTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editText: e.target.value });
  };

  handleConfirmClick = (id: number, cellName: CellNames) => {
    const { cars, editText } = this.state;

    //The bang signifying it will never be undefined, then setting the passed in property to the saved edit text
    cars.find(car => car.id === id)![cellName] = editText;

    this.setState({ cars, editableCell: { id: -1 } }, () => {
      carsManager.saveCars(cars);
    });
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const {
      cars: carsState,
      isReverseSort,
      searchTerm,
      editableCell
    } = this.state;

    const filteredCars = filterCars(carsState, searchTerm);

    const cars = isReverseSort
      ? sortByModel(filteredCars).reverse()
      : sortByModel(filteredCars);

    return (
      <CarsTable
        cars={cars}
        isReverseSort={isReverseSort}
        onSortClick={this.handleSortClick}
        onChange={this.handleSearchChange}
        onEditClick={this.handleEditClick}
        editableCell={editableCell}
        onConfirmClick={this.handleConfirmClick}
        onEditTextChange={this.handleEditTextChange}
      />
    );
  }
}

interface CarsTableContainerState {
  cars: Car[];
  searchTerm: string;
  isReverseSort: boolean;
  editableCell: EditableCell;
  editText: string;
}

export type EditableCell = { id: number; cellName?: CellNames };

export enum CellNames {
  MANUFACTURER = "manufacturer",
  MODEL = "model"
}
