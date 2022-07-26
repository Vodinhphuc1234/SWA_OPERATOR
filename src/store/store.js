const { configureStore } = require("@reduxjs/toolkit");
import navReducer from "../slices/navSlice";
const store = configureStore({
  reducer: navReducer,
});

export default store;
