import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { updateCount } from '@/store/features/count'

import { AtButton } from 'taro-ui'

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
      <AtButton type='primary'
        onClick={() => {
          handleClick()
        }}
      >
      按钮文案</AtButton>
    </View>
  )
}
