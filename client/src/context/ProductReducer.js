import { GET_PRODUCTS, SET_ATTRIBUTES } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case SET_ATTRIBUTES:
      return {
        ...state,
        attributes: payload,
      }
    default:
      return state;
  }
};