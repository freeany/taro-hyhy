import { configureStore } from "@reduxjs/toolkit";
import countSlice from "./features/count";
import userSlice from "./features/user";
// configureStore创建一个redux数据
const store = configureStore({
  reducer: {
    counter: countSlice,
    user: userSlice
  },
  devTools: true
});


export type RootState = ReturnType<typeof store.getState>
export default store

