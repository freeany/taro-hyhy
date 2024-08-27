import { UserInfoType } from "@/api/types/users.type";
import { getStorage } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateUserType {
  token: string,
  userInfo: UserInfoType
}

const initialStateUser: InitialStateUserType = {
  // token 身份令牌
  token: getStorage('token') ?? '',
  // 用户信息
  userInfo: getStorage('userInfo') ?? null,
}

export const UserSlice = createSlice({
  // 命名空间，在调用action的时候会默认的设置为action的前缀
  name: "user",
  // 初始值
  initialState: initialStateUser,
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    setToken(state, { payload }) {
      // 在调用 setToken 方法时，需要传入 token 数据进行赋值
      state.token = payload
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    }
  },
});
// 导出actions
export const { setToken, setUserInfo } = UserSlice.actions;
// 导出reducer，在创建store时使用到
export default UserSlice.reducer;
