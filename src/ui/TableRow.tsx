import * as React from "react";
import { CellNames } from "./CarsTableContainer";
import { Car } from "../service/CarsManager";
import { Button } from "./styledComponents/Button";

const manufacturerStyles = (manufacturer: string): React.CSSProperties =>
  manufacturer === "Ford" ? { fontWeight: 900 } : {};

export const TableRow = ({
  car,
  editableCellName,
  onEditClick,
  onEditTextChange,
  onConfirmClick: _onConfirmClick
}: TableRowProps) => {
  const { id, manufacturer, model } = car;

  const cellDisplay = (displayText: string, cellName: CellNames) => {
    //I played around with a higher order function to handle these two, but scrapped it when I decided to pass in display text for editClick
    const onConfirmClick = () => _onConfirmClick(id, cellName);
    const onClick = () => {
      onEditClick(id, cellName, displayText);
    };

    return editableCellName === cellName ? (
      <>
        <input
          type="text"
          defaultValue={displayText}
          onChange={onEditTextChange}
        />
        <button style={{ marginLeft: "5px" }} onClick={onConfirmClick}>
          confirm
        </button>
      </>
    ) : (
      <Button onClick={onClick}>{displayText}</Button>
    );
  };

  return (
    <tr key={id}>
      <th scope="row">{id}</th>
      <td style={manufacturerStyles(manufacturer)}>
        {cellDisplay(manufacturer, CellNames.MANUFACTURER)}
      </td>
      <td>{cellDisplay(model, CellNames.MODEL)}</td>
    </tr>
  );
};

interface TableRowProps {
  car: Car;
  onEditClick(id: number, cell: CellNames, currentText: string): void;
  editableCellName?: CellNames;
  onConfirmClick(id: number, cellName: CellNames): void;
  onEditTextChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
