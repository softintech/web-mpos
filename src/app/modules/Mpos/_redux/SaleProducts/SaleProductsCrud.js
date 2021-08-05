import axios from "axios";

export const SaleProductS_URL = "api/SaleProducts";

// CREATE =>  POST: add a new SaleProduct to the server
export function createSaleProduct(SaleProduct) {
  return axios.post(SaleProductS_URL, { SaleProduct });
}

// READ
export function getAllSaleProducts() {
  return axios.get(SaleProductS_URL);
}

export function getSaleProductById(SaleProductId) {
  return axios.get(`${SaleProductS_URL}/${SaleProductId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findSaleProducts(queryParams) {
  return axios.post(`${SaleProductS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the SaleProduct on the server
export function updateSaleProduct(SaleProduct) {
  return axios.put(`${SaleProductS_URL}/${SaleProduct.id}`, { SaleProduct });
}

// UPDATE Status
export function updateStatusForSaleProducts(ids, status) {
  return axios.post(`${SaleProductS_URL}/updateStatusForSaleProducts`, {
    ids,
    status
  });
}

// DELETE => delete the SaleProduct from the server
export function deleteSaleProduct(SaleProductId) {
  return axios.delete(`${SaleProductS_URL}/${SaleProductId}`);
}

// DELETE SaleProducts by ids
export function deleteSaleProducts(ids) {
  return axios.post(`${SaleProductS_URL}/deleteSaleProducts`, { ids });
}
