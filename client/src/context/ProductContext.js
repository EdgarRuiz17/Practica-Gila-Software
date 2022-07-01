import React, { useReducer, createContext } from "react";
import axios from "axios";
import ProductReducer from "./ProductReducer";
import { base_url } from "../Url";
import { GET_PRODUCTS } from "./types";

export const ProductContext = createContext();

const ProductProvider = (props) => {
    const initialState = {
        products: [],
        selectedProduct: null,
        sel: false,
        categories: [],
        items: [],
    };
  
    const [state, dispatch] = useReducer(ProductReducer, initialState);
  
    const getProducts = async() => {
        try {
            const res = await axios.get(`${base_url}`);
            const data = res.data;
            console.log(res.data);
            dispatch({ type: GET_PRODUCTS, payload: data });
        } catch (error) {
            console.error(error);
        }
    };

  
    return (
      <ProductContext.Provider
        value={{
            products: state.products,
            selectedProduct: state.selectedProduct,
            sel: state.sel,
            categories: state.categories,
            items: state.items,
            getProducts,
        }}
      >
        {props.children}
      </ProductContext.Provider>
    );
  };
  
  export default ProductProvider;