import axios from "axios";

export const ServiceAlS_URL = "api/ServiceAls";

// CREATE =>  POST: add a new ServiceAl to the server
export function createServiceAl(ServiceAl) {
  return axios.post(ServiceAlS_URL, { ServiceAl });
}

// READ
export function getAllServiceAls() {
  return axios.get(ServiceAlS_URL);
}

export function getServiceAlById(ServiceAlId) {
  return axios.get(`${ServiceAlS_URL}/${ServiceAlId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findServiceAls(queryParams) {
  return axios.post(`${ServiceAlS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the ServiceAl on the server
export function updateServiceAl(ServiceAl) {
  return axios.put(`${ServiceAlS_URL}/${ServiceAl.id}`, { ServiceAl });
}

// UPDATE Status
export function updateStatusForServiceAls(ids, status) {
  return axios.post(`${ServiceAlS_URL}/updateStatusForServiceAls`, {
    ids,
    status
  });
}

// DELETE => delete the ServiceAl from the server
export function deleteServiceAl(ServiceAlId) {
  return axios.delete(`${ServiceAlS_URL}/${ServiceAlId}`);
}

// DELETE ServiceAls by ids
export function deleteServiceAls(ids) {
  return axios.post(`${ServiceAlS_URL}/deleteServiceAls`, { ids });
}
