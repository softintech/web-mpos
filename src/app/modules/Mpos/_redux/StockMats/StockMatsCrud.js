import axios from "axios";

export const StockMatS_URL = "api/StockMats";

// CREATE =>  POST: add a new StockMat to the server
export function createStockMat(StockMat) {
  return axios.post(StockMatS_URL, { StockMat });
}

// READ
export function getAllStockMats() {
  return axios.get(StockMatS_URL);
}

export function getStockMatById(StockMatId) {
  return axios.get(`${StockMatS_URL}/${StockMatId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findStockMats(queryParams) {
  return axios.post(`${StockMatS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the StockMat on the server
export function updateStockMat(StockMat) {
  return axios.put(`${StockMatS_URL}/${StockMat.id}`, { StockMat });
}

// UPDATE Status
export function updateStatusForStockMats(ids, status) {
  return axios.post(`${StockMatS_URL}/updateStatusForStockMats`, {
    ids,
    status
  });
}

// DELETE => delete the StockMat from the server
export function deleteStockMat(StockMatId) {
  return axios.delete(`${StockMatS_URL}/${StockMatId}`);
}

// DELETE StockMats by ids
export function deleteStockMats(ids) {
  return axios.post(`${StockMatS_URL}/deleteStockMats`, { ids });
}
