import * as React from "react";
import { shallow } from "enzyme";
import { CarsTableContainer, CellNames } from "../CarsTableContainer";
import { carsManager } from "../../service/CarsManager";

jest.spyOn(carsManager, "getCars");
jest.spyOn(carsManager, "saveCars");

it("given CarsTable isReverseSort is false and its onSortClick is called, its isReverseSort should be set to true", () => {
  const shallowWrapper = shallow(<CarsTableContainer />, {
    disableLifecycleMethods: true
  });

  //Note: Enzyme has a simulate function that is sugar for props()[propName] like shown below, however it is very finicky and they are depricating it.
  (shallowWrapper.find("CarsTable").props() as any).onSortClick();

  expect(
    (shallowWrapper.find("CarsTable").props() as any).isReverseSort
  ).toBeTruthy();
});

it("given cars are returned from manager, they should be sorted by model when passed to CarsTable", async () => {
  const cars = [
    {
      id: 3,
      manufacturer: "Ford",
      model: "Z"
    },
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    }
  ];

  (carsManager.getCars as jest.Mock<any>).mockResolvedValue(cars);

  const shallowWrapper = shallow(<CarsTableContainer />);

  //Note: multiple update calls are needed because of how it interacts with the callstack
  await shallowWrapper.update();
  await shallowWrapper.update();
  await shallowWrapper.update();

  expect((shallowWrapper.find("CarsTable").props() as any).cars).toEqual([
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    },
    {
      id: 3,
      manufacturer: "Ford",
      model: "Z"
    }
  ]);
});

it("given cars are returned from manager and CarsTables onSortClick is called, they should be reversed", async () => {
  const cars = [
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    },
    {
      id: 3,
      manufacturer: "Ford",
      model: "F-150"
    }
  ];

  (carsManager.getCars as jest.Mock<any>).mockResolvedValue(cars);

  const shallowWrapper = shallow(<CarsTableContainer />);

  await shallowWrapper.update();
  await shallowWrapper.update();
  await shallowWrapper.update();

  (shallowWrapper.find("CarsTable").props() as any).onSortClick();

  expect((shallowWrapper.find("CarsTable").props() as any).cars).toEqual([
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    },
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 3,
      manufacturer: "Ford",
      model: "F-150"
    }
  ]);
});

it("given CarsTables onChange is called, cars passed in should be filtered", async () => {
  const cars = [
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    },
    {
      id: 3,
      manufacturer: "Ford",
      model: "F-150"
    }
  ];

  (carsManager.getCars as jest.Mock<any>).mockResolvedValue(cars);

  const shallowWrapper = shallow(<CarsTableContainer />);

  await shallowWrapper.update();
  await shallowWrapper.update();
  await shallowWrapper.update();

  (shallowWrapper.find("CarsTable").props() as any).onChange({
    target: { value: "Focus" }
  });

  expect((shallowWrapper.find("CarsTable").props() as any).cars).toEqual([
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    }
  ]);
});

it("given CarsTables onConfirmClick is called, the cell and car matching what was passed in should be updated with the editText", async () => {
  const cars = [
    {
      id: 1,
      manufacturer: "Ford",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    },
    {
      id: 3,
      manufacturer: "Ford",
      model: "F-150"
    }
  ];

  (carsManager.getCars as jest.Mock<any>).mockResolvedValue(cars);

  const shallowWrapper = shallow(<CarsTableContainer />);

  await shallowWrapper.update();
  await shallowWrapper.update();
  await shallowWrapper.update();

  (shallowWrapper.find("CarsTable").props() as any).onEditTextChange({
    target: { value: "FOOBAR" }
  });

  (shallowWrapper.find("CarsTable").props() as any).onConfirmClick(
    1,
    CellNames.MANUFACTURER
  );

  const expected = [
    {
      id: 3,
      manufacturer: "Ford",
      model: "F-150"
    },
    {
      id: 1,
      manufacturer: "FOOBAR",
      model: "Focus"
    },
    {
      id: 2,
      manufacturer: "Ford",
      model: "Mustang"
    }
  ];

  expect((shallowWrapper.find("CarsTable").props() as any).cars).toEqual(
    expected
  );

  expect(carsManager.saveCars).toHaveBeenCalledWith(expected);
});
