import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
import PRODUCTS from "../shop-data";
export const CategoriesContext = createContext({
  categoriesMap: {},
});

const getProductsFromFile = () => {
  const categoriesMap = PRODUCTS.reduce((acc, product) => {
    const { title, items } = product;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoriesMap;
};

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  useEffect(() => {
    const getCategoryMap = async () => {
      try {
        const categoriesMap = await getCategoriesAndDocuments();
        setCategoriesMap(categoriesMap);
      } catch (e) {
        setCategoriesMap(getProductsFromFile());
      }
    };
    getCategoryMap();
  }, []);
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
