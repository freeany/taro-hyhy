import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Category() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='category'>
      <Text>Hello Category!</Text>
    </View>
  )
}
