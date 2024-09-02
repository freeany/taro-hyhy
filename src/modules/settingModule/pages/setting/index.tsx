import { View } from "@tarojs/components"
import { Button } from "@taroify/core"
import Taro from "@tarojs/taro"
import './index.scss'

export default function Setting() {
  return (
    <View className='page-container setting-container'>
      <View className='setting-list'>
        <View
          onClick={() => {
            Taro.navigateTo({
              url: '/modules/settingModule/pages/profile/index'
            })
          }}
          hover-className='none'
          className='setting-item'
        >
          修改个人资料
        </View>
      </View>

      {/* 操作列表 */}
      <View className='setting-list'>
        <View
          onClick={() => {
            Taro.navigateTo({
              url: '/modules/settingModule/pages/address/list/index?flag=1'
            })
          }}
          hover-className='none'
          className='setting-item'
        >
          我的收货地址
        </View>
      </View>

      <View className='setting-list concat'>
        <Button variant='outlined' color='default' className='concat-button' openType='feedback'>问题反馈</Button>
        <Button variant='outlined' color='default' className='concat-button' openType='contact'>联系我们</Button>
        <Button variant='outlined' color='default' className='concat-button' openType='openSetting'>授权信息</Button>
      </View>
    </View>
  )
}
