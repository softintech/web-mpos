import axios from "axios";

export const SalePosS_URL = "api/SalePoss";

// CREATE =>  POST: add a new SalePos to the server
export function createSalePos(SalePos) {
  return axios.post(SalePosS_URL, { SalePos });
}

// READ
export function getAllSalePoss() {
  return axios.get(SalePosS_URL);
}

export function getSalePosById(SalePosId) {
  return axios.get(`${SalePosS_URL}/${SalePosId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findSalePoss(queryParams) {
  return axios.post(`${SalePosS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the SalePos on the server
export function updateSalePos(SalePos) {
  return axios.put(`${SalePosS_URL}/${SalePos.id}`, { SalePos });
}

// UPDATE Status
export function updateStatusForSalePoss(ids, status) {
  return axios.post(`${SalePosS_URL}/updateStatusForSalePoss`, {
    ids,
    status
  });
}

// DELETE => delete the SalePos from the server
export function deleteSalePos(SalePosId) {
  return axios.delete(`${SalePosS_URL}/${SalePosId}`);
}

// DELETE SalePoss by ids
export function deleteSalePoss(ids) {
  return axios.post(`${SalePosS_URL}/deleteSalePoss`, { ids });
}
