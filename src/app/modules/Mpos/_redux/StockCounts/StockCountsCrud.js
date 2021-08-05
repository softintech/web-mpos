import axios from "axios";

export const StockCountS_URL = "api/StockCounts";

// CREATE =>  POST: add a new StockCount to the server
export function createStockCount(StockCount) {
  return axios.post(StockCountS_URL, { StockCount });
}

// READ
export function getAllStockCounts() {
  return axios.get(StockCountS_URL);
}

export function getStockCountById(StockCountId) {
  return axios.get(`${StockCountS_URL}/${StockCountId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findStockCounts(queryParams) {
  return axios.post(`${StockCountS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the StockCount on the server
export function updateStockCount(StockCount) {
  return axios.put(`${StockCountS_URL}/${StockCount.id}`, { StockCount });
}

// UPDATE Status
export function updateStatusForStockCounts(ids, status) {
  return axios.post(`${StockCountS_URL}/updateStatusForStockCounts`, {
    ids,
    status
  });
}

// DELETE => delete the StockCount from the server
export function deleteStockCount(StockCountId) {
  return axios.delete(`${StockCountS_URL}/${StockCountId}`);
}

// DELETE StockCounts by ids
export function deleteStockCounts(ids) {
  return axios.post(`${StockCountS_URL}/deleteStockCounts`, { ids });
}
