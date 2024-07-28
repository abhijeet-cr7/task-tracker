import React from "react";
import { IDropdown, IDropdownList } from "./IDropdown";
import { Checkbox } from "@mui/material";
import "./Dropdown.css";
import { useState } from "react";

const Dropdown = (props: IDropdown) => {
  const { dropdownList, multiselect } = props;
  const [showList, setShowList] = useState(false);
  const [selectedList, setSelectedList] = useState(dropdownList);
  const [singleSelect, setSingleSelect] = useState({
    id: "",
    name: "",
    createdAt: new Date(),
  });
  const dropdownListSelected = (dropdownListClicked: IDropdownList) => {
    const clonedSelectedList = JSON.parse(JSON.stringify(selectedList));
    if (multiselect) {
      if (
        selectedList.findIndex(
          (item: IDropdownList) => item.id === dropdownListClicked.id
        ) === -1
      ) {
        clonedSelectedList.push(selectedList);
        setSelectedList(clonedSelectedList);
      } else {
        let index = selectedList.findIndex(
          (item: IDropdownList) => item.id === dropdownListClicked.id
        );
        clonedSelectedList.splice(index, 1);
        setSelectedList(clonedSelectedList);
      }
    } else {
    }
  };
  return (
    <div className="Dropdown_main">
        <div onClick={() => {setShowList((prev) => !prev)}} className="Dropdown_list_closed">
          {multiselect ? (
            <p>{selectedList.filter((item) => item.checked).length} items</p>
          ) : singleSelect.id === "" ? (
            <p>{dropdownList[0].name}</p>
          ) : (
            <p>{singleSelect.name}</p>
          )}
        </div>
      {showList && (
        <div className="Dropdown_list_open_wrapper">
          {dropdownList.map((eachDropDownList: IDropdownList) => {
            return (
              <>
                <div
                  onClick={() => dropdownListSelected(eachDropDownList)}
                  className="Dropdown_list_open"
                >
                  {multiselect && (
                    <Checkbox
                      checked={
                        selectedList.findIndex(
                          (item) => item.checked === eachDropDownList.checked
                        ) !== -1
                          ? true
                          : false
                      }
                    />
                  )}
                  <p>{eachDropDownList.name}</p>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
