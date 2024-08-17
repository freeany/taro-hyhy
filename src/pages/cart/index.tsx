import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Cart() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='cart'>
      <Text>Hello Cart!</Text>
    </View>
  )
}
