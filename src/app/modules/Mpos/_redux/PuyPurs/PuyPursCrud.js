import axios from "axios";

export const PuyPurS_URL = "api/PuyPurs";

// CREATE =>  POST: add a new PuyPur to the server
export function createPuyPur(PuyPur) {
  return axios.post(PuyPurS_URL, { PuyPur });
}

// READ
export function getAllPuyPurs() {
  return axios.get(PuyPurS_URL);
}

export function getPuyPurById(PuyPurId) {
  return axios.get(`${PuyPurS_URL}/${PuyPurId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPuyPurs(queryParams) {
  return axios.post(`${PuyPurS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the PuyPur on the server
export function updatePuyPur(PuyPur) {
  return axios.put(`${PuyPurS_URL}/${PuyPur.id}`, { PuyPur });
}

// UPDATE Status
export function updateStatusForPuyPurs(ids, status) {
  return axios.post(`${PuyPurS_URL}/updateStatusForPuyPurs`, {
    ids,
    status
  });
}

// DELETE => delete the PuyPur from the server
export function deletePuyPur(PuyPurId) {
  return axios.delete(`${PuyPurS_URL}/${PuyPurId}`);
}

// DELETE PuyPurs by ids
export function deletePuyPurs(ids) {
  return axios.post(`${PuyPurS_URL}/deletePuyPurs`, { ids });
}
