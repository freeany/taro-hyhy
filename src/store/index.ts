import { configureStore } from "@reduxjs/toolkit";
import countSlice from "./features/count";
// configureStore创建一个redux数据
const store = configureStore({
  reducer: {
    counter: countSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export default store

