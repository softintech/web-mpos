import axios from "axios";

export const ServiceContractS_URL = "api/ServiceContracts";

// CREATE =>  POST: add a new ServiceContract to the server
export function createServiceContract(ServiceContract) {
  return axios.post(ServiceContractS_URL, { ServiceContract });
}

// READ
export function getAllServiceContracts() {
  return axios.get(ServiceContractS_URL);
}

export function getServiceContractById(ServiceContractId) {
  return axios.get(`${ServiceContractS_URL}/${ServiceContractId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findServiceContracts(queryParams) {
  return axios.post(`${ServiceContractS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the ServiceContract on the server
export function updateServiceContract(ServiceContract) {
  return axios.put(`${ServiceContractS_URL}/${ServiceContract.id}`, { ServiceContract });
}

// UPDATE Status
export function updateStatusForServiceContracts(ids, status) {
  return axios.post(`${ServiceContractS_URL}/updateStatusForServiceContracts`, {
    ids,
    status
  });
}

// DELETE => delete the ServiceContract from the server
export function deleteServiceContract(ServiceContractId) {
  return axios.delete(`${ServiceContractS_URL}/${ServiceContractId}`);
}

// DELETE ServiceContracts by ids
export function deleteServiceContracts(ids) {
  return axios.post(`${ServiceContractS_URL}/deleteServiceContracts`, { ids });
}
