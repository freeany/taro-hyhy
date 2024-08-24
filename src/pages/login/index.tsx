import { View, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import avatarPng from '@/assets/Images/avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/index'
import { reqLogin, reqUserInfo } from '@/api/user'

import { setToken, setUserInfo } from '@/store/features/user'

import './index.scss'
import { setStorage } from '@/utils/storage'

export default function Login() {
  const dispatch = useDispatch()

  const token = useSelector<RootState, string>(state => state.user.token)
  const userInfo = useSelector<RootState, any>(state => state.user.userInfo)

  useLoad(() => {
    console.log('Page loaded.')
  })

  const getUserInfo = async () => {
    const { data } = await reqUserInfo()
    // 将用户信息存储到本地
    setStorage('userInfo', data)
    // 将用户信息存储到 Store
    this.setUserInfo(data)
  }
  const login = () => {
    Taro.login({
      success: async ({ code }) => {
        if (code) {
          // 调用接口 API，传入 code 进行登录
          const { data } = await reqLogin(code)

          // 登录成功以后将 token 存储到本地
          setStorage('token', data.token)

          // 将数据存储到 store 对象中
          this.setToken(data.token)
          this.getUserInfo()

          // 返回之前的页面
          wx.navigateBack()
        } else {
          // 登录失败后给用户进行提示
          toast({ title: '授权失败，请稍后再试~~~' })
        }
      }
    })
  }

  return (
    <View className='login page-container'>
      {/* <Text>Hello login!</Text> */}
      <Image className='login__image__img' src={avatarPng} mode='widthFix'></Image>
      <View className='login__description'>请点击下方的按钮，授权登陆您的账户～</View>

      <AtButton circle className='bottom-button' type='primary' onClick={login}>点击授权登陆</AtButton>
    </View>
  )
}
