import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow, useLoad, useReady } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { UserInfoType } from '@/api/types/users.type'
import { RootState } from '@/store/index'

import bannerPng from '@/assets/Images/banner.jpg'
import avatarPng from '@/assets/Images/avatar.png'
import './index.scss'


export default function My() {
  const token = useSelector<RootState, string>(state => state.user.token)
  const userInfo = useSelector<RootState, UserInfoType>(state => state.user.userInfo)

  useLoad(() => {
    console.log('Page loaded_my.')
  })
  useReady(() => {
    console.log('Page ready_my');
  })

  useDidShow(() => {
    console.log('Page useDidShow_my');
    // Taro.reLaunch()
  })

  const initpanel = useMemo(() => ([
    {
      url: '/modules/orderPayModule/pages/order/list/index',
      title: '商品订单',
      iconfont: 'icon-dingdan'
    },
    {
      url: '/modules/orderPayModule/pages/order/list/index',
      title: '礼品卡订单',
      iconfont: 'icon-lipinka'
    },
    {
      url: '/modules/orderPayModule/pages/order/list/index',
      title: '退款/售后',
      iconfont: 'icon-tuikuan'
    }
  ]), [])

  const toLoginPage = useCallback(() => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  },[])
  return (
    <View className='my page-container'>
      {/* 顶部展示图 */}
      <View className='top-show'>
        <Image
          mode='widthFix'
          className='top-show-img'
          src={bannerPng}
        ></Image>
      </View>

      <View className='bottom-show'>
        {
          (!token || !userInfo) ? (<View className='user-container section' onClick={toLoginPage}>
            {/* 未登录面板 */}
            <View className='avatar-container'>
              <Image src={avatarPng}></Image>
              <View className='no-login'>
                <Text className='ellipsis'>未登录</Text>
                <Text>点击授权登录</Text>
              </View>
            </View>
          </View>) :
            <View className='user-container section'>
              {/* 登录以后得面板 */}
              <View className='avatar-container'>
                <Image src={userInfo.headimgurl}></Image>
                <View className='no-login'>
                  <Text className='ellipsis'>{userInfo.nickname}</Text>
                </View>
              </View>
              <View className='setting'>
                <View onClick={() => {
                  Taro.navigateTo({
                    url: '/modules/settingModule/pages/setting/index'
                  })
                }}
                > 设置 </View>
              </View>
            </View>
        }
        {/* 订单面板 */}
        <View className='order section'>
          <View className='order-title-wrap'>
            <Text className='title'>我的订单</Text>
            <Text className='more'>查看更多{'>'}</Text>
          </View>
          <View className='order-content-wrap'>
            {
              initpanel.map((item, index) => (
                <View className='order-content-item' key={index}>
                  <View onClick={() => {
                    Taro.navigateTo({
                      url: token ? item.url : '/pages/login/index'
                    })
                  }}
                  >
                    <view className={classNames("iconfont", item.iconfont)}></view>
                    <text>{item.title}</text>
                  </View>
                </View>
              ))
            }
          </View>
        </View>

        {/* 关于售前售后服务面板 */}
        <View className='after-scale section'>
          <View className='order-title-wrap'>
            <Text className='title'>关于售前售后服务</Text>
          </View>
          <View className='after-scale-item'>
            <View className='iconfont icon-kefufenxiermaikefu'></View>
            <Text>可与小程序客服实时聊天或电话咨询</Text>
          </View>
          <View className='after-scale-item'>
            <View className='iconfont icon-shijian'></View>
            <Text>小程序客服工作时间为: 8:30 ~ 20:30</Text>
          </View>
          <View className='after-scale-item'>
            <View className='iconfont icon-dizhiguanli'></View>
            <Text>鲜花制作完毕情况下暂不支持退款</Text>
          </View>
          <View className='after-scale-item'>
            <View className='iconfont icon-zhangben'></View>
            <Text>鲜花可以提前7-15天预订重大节假日不支持定时配送</Text>
          </View>
        </View>

        {/* 底部面板 */}
        <View className='info-footer'> 云客栈技术支持 </View>
      </View>
    </View >
  )
}
