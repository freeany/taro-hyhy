import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'


export default function Category() {
  const title = process.env.TARO_APP_TITLE
  const api = process.env.TARO_APP_API

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='category page-container'>
      <Text>Hello Category!</Text>
      <Text>{ title } -- { api }</Text>
      <Text className='iconfont icon-tuikuan a'></Text>
    </View>
  )
}
