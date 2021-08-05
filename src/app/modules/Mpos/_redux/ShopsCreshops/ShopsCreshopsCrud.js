import axios from "axios";

export const ShopsCreshopS_URL = "api/ShopsCreshops";

// CREATE =>  POST: add a new ShopsCreshop to the server
export function createShopsCreshop(ShopsCreshop) {
  return axios.post(ShopsCreshopS_URL, { ShopsCreshop });
}

// READ
export function getAllShopsCreshops() {
  return axios.get(ShopsCreshopS_URL);
}

export function getShopsCreshopById(ShopsCreshopId) {
  return axios.get(`${ShopsCreshopS_URL}/${ShopsCreshopId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findShopsCreshops(queryParams) {
  return axios.post(`${ShopsCreshopS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the ShopsCreshop on the server
export function updateShopsCreshop(ShopsCreshop) {
  return axios.put(`${ShopsCreshopS_URL}/${ShopsCreshop.id}`, { ShopsCreshop });
}

// UPDATE Status
export function updateStatusForShopsCreshops(ids, status) {
  return axios.post(`${ShopsCreshopS_URL}/updateStatusForShopsCreshops`, {
    ids,
    status
  });
}

// DELETE => delete the ShopsCreshop from the server
export function deleteShopsCreshop(ShopsCreshopId) {
  return axios.delete(`${ShopsCreshopS_URL}/${ShopsCreshopId}`);
}

// DELETE ShopsCreshops by ids
export function deleteShopsCreshops(ids) {
  return axios.post(`${ShopsCreshopS_URL}/deleteShopsCreshops`, { ids });
}
