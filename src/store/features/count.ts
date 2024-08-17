import { createSlice } from "@reduxjs/toolkit";

export const CountSlice = createSlice({
  // 命名空间，在调用action的时候会默认的设置为action的前缀
  name: "count",
  // 初始值
  initialState: {
    count: 0,
  },
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    updateCount(state, { payload = 1 }) {
      // 内置了immutable
      state.count += payload;
    },
  },
});
// 导出actions
export const { updateCount } = CountSlice.actions;
// 导出reducer，在创建store时使用到
export default CountSlice.reducer;
