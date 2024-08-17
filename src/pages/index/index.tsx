import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import a from '@/api/user'
import './index.scss'

console.log(a,'aaaaaaa');

export default class Index extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
