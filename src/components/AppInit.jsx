import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice.js";

function AppInit({ children }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  return children;
}

export default AppInit;
