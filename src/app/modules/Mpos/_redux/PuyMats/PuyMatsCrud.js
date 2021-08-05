import axios from "axios";

export const PuyMatS_URL = "api/PuyMats";

// CREATE =>  POST: add a new PuyMat to the server
export function createPuyMat(PuyMat) {
  return axios.post(PuyMatS_URL, { PuyMat });
}

// READ
export function getAllPuyMats() {
  return axios.get(PuyMatS_URL);
}

export function getPuyMatById(PuyMatId) {
  return axios.get(`${PuyMatS_URL}/${PuyMatId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPuyMats(queryParams) {
  return axios.post(`${PuyMatS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the PuyMat on the server
export function updatePuyMat(PuyMat) {
  return axios.put(`${PuyMatS_URL}/${PuyMat.id}`, { PuyMat });
}

// UPDATE Status
export function updateStatusForPuyMats(ids, status) {
  return axios.post(`${PuyMatS_URL}/updateStatusForPuyMats`, {
    ids,
    status
  });
}

// DELETE => delete the PuyMat from the server
export function deletePuyMat(PuyMatId) {
  return axios.delete(`${PuyMatS_URL}/${PuyMatId}`);
}

// DELETE PuyMats by ids
export function deletePuyMats(ids) {
  return axios.post(`${PuyMatS_URL}/deletePuyMats`, { ids });
}
