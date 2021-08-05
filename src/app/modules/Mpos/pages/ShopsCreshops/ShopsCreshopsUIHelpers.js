export const ShopsCreshopStatusCssClasses = ["danger", "success", "info", ""];
export const ShopsCreshopStatusTitles = ["Suspended", "Active", "Pending", ""];
export const ShopsCreshopTypeCssClasses = ["success", "primary", ""];
export const ShopsCreshopTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    lastName: "",
    firstName: "",
    email: "",
    ipAddress: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};
