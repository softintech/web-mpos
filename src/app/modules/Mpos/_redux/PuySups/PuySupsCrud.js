import axios from "axios";

export const PuySupS_URL = "api/PuySups";

// CREATE =>  POST: add a new PuySup to the server
export function createPuySup(PuySup) {
  return axios.post(PuySupS_URL, { PuySup });
}

// READ
export function getAllPuySups() {
  return axios.get(PuySupS_URL);
}

export function getPuySupById(PuySupId) {
  return axios.get(`${PuySupS_URL}/${PuySupId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPuySups(queryParams) {
  return axios.post(`${PuySupS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the PuySup on the server
export function updatePuySup(PuySup) {
  return axios.put(`${PuySupS_URL}/${PuySup.id}`, { PuySup });
}

// UPDATE Status
export function updateStatusForPuySups(ids, status) {
  return axios.post(`${PuySupS_URL}/updateStatusForPuySups`, {
    ids,
    status
  });
}

// DELETE => delete the PuySup from the server
export function deletePuySup(PuySupId) {
  return axios.delete(`${PuySupS_URL}/${PuySupId}`);
}

// DELETE PuySups by ids
export function deletePuySups(ids) {
  return axios.post(`${PuySupS_URL}/deletePuySups`, { ids });
}
