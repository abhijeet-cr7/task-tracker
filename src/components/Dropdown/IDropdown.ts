export type IDropdown = {
    dropdownList : IDropdownList[],
    multiselect : boolean;
}

export type IDropdownList = {
    id : string,
    name : string,
    checked? : boolean,
}