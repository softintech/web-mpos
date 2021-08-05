export const SaleProductStatusCssClasses = ["danger", "success", "info", ""];
export const SaleProductStatusTitles = ["Suspended", "Active", "Pending", ""];
export const SaleProductTypeCssClasses = ["success", "primary", ""];
export const SaleProductTypeTitles = ["Business", "Individual", ""];
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
