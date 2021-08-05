import axios from "axios";

export const ShopsCreEmpS_URL = "api/ShopsCreEmps";

// CREATE =>  POST: add a new ShopsCreEmp to the server
export function createShopsCreEmp(ShopsCreEmp) {
  return axios.post(ShopsCreEmpS_URL, { ShopsCreEmp });
}

// READ
export function getAllShopsCreEmps() {
  return axios.get(ShopsCreEmpS_URL);
}

export function getShopsCreEmpById(ShopsCreEmpId) {
  return axios.get(`${ShopsCreEmpS_URL}/${ShopsCreEmpId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findShopsCreEmps(queryParams) {
  return axios.post(`${ShopsCreEmpS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the ShopsCreEmp on the server
export function updateShopsCreEmp(ShopsCreEmp) {
  return axios.put(`${ShopsCreEmpS_URL}/${ShopsCreEmp.id}`, { ShopsCreEmp });
}

// UPDATE Status
export function updateStatusForShopsCreEmps(ids, status) {
  return axios.post(`${ShopsCreEmpS_URL}/updateStatusForShopsCreEmps`, {
    ids,
    status
  });
}

// DELETE => delete the ShopsCreEmp from the server
export function deleteShopsCreEmp(ShopsCreEmpId) {
  return axios.delete(`${ShopsCreEmpS_URL}/${ShopsCreEmpId}`);
}

// DELETE ShopsCreEmps by ids
export function deleteShopsCreEmps(ids) {
  return axios.post(`${ShopsCreEmpS_URL}/deleteShopsCreEmps`, { ids });
}
