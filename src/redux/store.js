import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice.js";
import cardReducer from "../redux/cartSlice.js";
import themeReducer from "../redux/themeSlice.js";
import productReducer from "../redux/productSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const themePersistConfig = {
  key: "theme",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cardReducer,
  product: productReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), // 👈 thunk ko manually mat add karo
});

export const persistor = persistStore(store);
