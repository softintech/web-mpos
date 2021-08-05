import { Init } from "./init";
export const reducer = (state = Init, action) => {
  switch (action.type) {
    case action.type:
      return {
        ...state,
        [action.type]: action.value
      };
      break;
    default:
      return state;
      break;
  }
};
