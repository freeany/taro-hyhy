import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/index'
import { updateCount } from '@/store/features/count'
import { Button } from "@taroify/core"

import './index.scss'

export default function Cart() {
  const dispatch = useDispatch()
  const count = useSelector<RootState, number>(state => state.counter.count)
  const handleClick = () => {
    dispatch(updateCount(1))
  }
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='cart page-container'>
      <Text>Hello Cart!{ count }</Text>
      <Button color='primary'
        onClick={() => {
          handleClick()
        }}
      >
      按钮文案</Button>
    </View>
  )
}
