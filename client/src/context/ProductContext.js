import React, { useReducer, createContext } from "react";
import axios from "axios";
import ProductReducer from "./ProductReducer";
import { base_url } from "../Url";
import { GET_PRODUCTS, SET_ATTRIBUTES } from "./types";

export const ProductContext = createContext();

const ProductProvider = (props) => {
    const initialState = {
        products: [],
        selectedProduct: null,
        sel: false,
        categories: [],
        items: [],
        attributes: [],
    };
  
    const [state, dispatch] = useReducer(ProductReducer, initialState);
  
    const getProducts = async() => {
        try {
            const res = await axios.get(`${base_url}`);
            const data = res.data;
            console.log(res.data);
            getAttributes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAttributes = (data) => {
      const atributos = [];
      for(var i=0; i<data.length ; i++){
        var obj = JSON.parse(data[i].attribute_category);
        atributos.push({...data[i],...obj});
      }
      dispatch({ type: GET_PRODUCTS, payload: atributos });
    }

  
    return (
      <ProductContext.Provider
        value={{
            products: state.products,
            selectedProduct: state.selectedProduct,
            sel: state.sel,
            categories: state.categories,
            items: state.items,
            attributes: state.attributes,
            getProducts,
        }}
      >
        {props.children}
      </ProductContext.Provider>
    );
  };
  
  export default ProductProvider;