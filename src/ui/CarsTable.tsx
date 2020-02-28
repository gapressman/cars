import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { TableRow } from "./TableRow";
import { Car } from "../service/CarsManager";
import { EditableCell, CellNames } from "./CarsTableContainer";
import { BoldButton } from "./styledComponents/Button";

const idColWidth = 10;
const mainColWidth = (100 - idColWidth) / 2;

export const CarsTable = ({
  isReverseSort,
  cars,
  onSortClick,
  onChange,
  onEditClick,
  editableCell,
  onConfirmClick,
  onEditTextChange
}: CarsTableInterface) => {
  const iconDirection = isReverseSort ? faSortDown : faSortUp;

  return (
    <div className="d-flex flex-column mt-5 align-items-center">
      <input
        type="text"
        placeholder="Search Models"
        onChange={onChange}
        className="mb-1 w-75"
      />
      <table className="table-dark w-75 text-center">
        <thead>
          <tr>
            <th style={{ width: `${idColWidth}%` }} scope="col">
              Id
            </th>
            <th style={{ width: `${mainColWidth}%` }} scope="col">
              Manufacturer
            </th>
            <th style={{ width: `${mainColWidth}%` }} scope="col">
              <BoldButton onClick={onSortClick}>
                Model
                <FontAwesomeIcon icon={iconDirection} />
              </BoldButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => {
            const editableCellName =
              car.id === editableCell.id ? editableCell.cellName : undefined;
            return (
              <TableRow
                editableCellName={editableCellName}
                onEditTextChange={onEditTextChange}
                onEditClick={onEditClick}
                onConfirmClick={onConfirmClick}
                car={car}
                key={car.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface CarsTableInterface {
  isReverseSort: boolean;
  cars: Car[];
  onSortClick(): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onEditTextChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onEditClick(id: number, cell: CellNames, currentText: string): void;
  editableCell: EditableCell;
  onConfirmClick(id: number, cellName: CellNames): void;
}
