import { View, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import avatarPng from '@/assets/Images/avatar.png'
import { useDispatch } from 'react-redux'
import { reqLogin, reqUserInfo } from '@/api/user'
import { setStorage } from '@/utils/storage'
import { setToken, setUserInfo } from '@/store/features/user'
import { IconType, toast } from '@/utils/extendApi'

import './index.scss'

export default function Login() {
  const dispatch = useDispatch()

  useLoad(() => {
    console.log('Page loaded._login')
  })

  const getUserInfo = async () => {
    const data = await reqUserInfo()
    // 将用户信息存储到本地
    setStorage('userInfo', data)
    return data
  }
  const login = () => {
    Taro.login({
      success: async ({ code }) => {
        if (code) {
          // 调用接口 API，传入 code 进行登录
          const { token } = await reqLogin(code)
          // 登录成功以后将 token 存储到本地
          setStorage('token', token)
          // 将数据存储到 store 对象中
          dispatch(setToken(token))
          const userInfoData = await getUserInfo()
          // 将token和用户信息存储到 Store
          dispatch(setToken(token))
          dispatch(setUserInfo(userInfoData))

          // 返回之前的页面
          Taro.navigateBack()
          // Taro.reLaunch({
          //   url: "/pages/my/index"
          // })
        } else {
          // 登录失败后给用户进行提示
          toast('授权失败，请稍后再试~~~', IconType.Error)
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
