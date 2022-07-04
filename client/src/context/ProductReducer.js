//Types
import { GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCTSCAT } from "./types";

export default function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      }
    case GET_PRODUCTSCAT:
      return {
        ...state,
        productsCategory: payload,
      }
    default:
      return state;
  }
};