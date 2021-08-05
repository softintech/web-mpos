let now = new Date();
let today = `${now.getFullYear()}-${
  now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
}-${now.getDate() < 9 ? "0" + now.getDate() : now.getDate()}`;

export const Init = {
  pagehistory: 0
};
