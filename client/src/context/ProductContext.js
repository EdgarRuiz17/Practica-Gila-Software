import React, { useReducer, createContext, useState } from "react";
import axios from "axios";

//Reducer
import ProductReducer from "./ProductReducer";

//URL API`s
import { base_url } from "../Url";

//types
import { GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCTSCAT } from "./types";

export const ProductContext = createContext();

const ProductProvider = (props) => {
  const initialState = {
    products: [],
    categories: [],
    productsCategory: [],
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const getProducts = async () => {
    await axios.get(`${base_url}`)
      .then((res) => {
        const data = res.data;
        getAttributes(data);
      })
      .catch((err) => {
        throw err;
      })

  };

  const getAttributes = (data) => {
    const atributos = [];
    for (var i = 0; i < data.length; i++) {
      var obj = JSON.parse(data[i].attribute_category);
      atributos.push({ ...data[i], ...obj });
    }
    dispatch({ type: GET_PRODUCTS, payload: atributos });
  }

  const getCategories = async () => {
    await axios.get(base_url + `categories`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, payload: res.data });
      })
  }

  const getProductsCategory = async (id) => {
    await axios.get(base_url + `categories/` + id)
      .then((res) => {
        getAttributesByCategory(res.data);
      })
  }

  const getAttributesByCategory = (data) => {
    const attributes = [];
    for (var i = 0; i < data.length; i++) {
      var obj = JSON.parse(data[i].attribute_category);
      attributes.push({ ...data[i], ...obj });
    }
    dispatch({ type: GET_PRODUCTSCAT, payload: attributes });
  }

  const [category, setCategory] = useState('0');

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        categories: state.categories,
        category,
        productsCategory: state.productsCategory,
        getProducts,
        getCategories,
        setCategory,
        getProductsCategory
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;