import axios from "axios";

export const ResultS_URL = "api/Results";

// CREATE =>  POST: add a new Result to the server
export function createResult(Result) {
  return axios.post(ResultS_URL, { Result });
}

// READ
export function getAllResults() {
  return axios.get(ResultS_URL);
}

export function getResultById(ResultId) {
  return axios.get(`${ResultS_URL}/${ResultId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findResults(queryParams) {
  return axios.post(`${ResultS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the Result on the server
export function updateResult(Result) {
  return axios.put(`${ResultS_URL}/${Result.id}`, { Result });
}

// UPDATE Status
export function updateStatusForResults(ids, status) {
  return axios.post(`${ResultS_URL}/updateStatusForResults`, {
    ids,
    status
  });
}

// DELETE => delete the Result from the server
export function deleteResult(ResultId) {
  return axios.delete(`${ResultS_URL}/${ResultId}`);
}

// DELETE Results by ids
export function deleteResults(ids) {
  return axios.post(`${ResultS_URL}/deleteResults`, { ids });
}
