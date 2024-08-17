import { Component, PropsWithChildren } from 'react'
import './app.scss'

class App extends Component<PropsWithChildren> {

    // 设置全局变量 "x"
  // eslint-disable-next-line react/sort-comp
  taroGlobalData = {
    x: 1,
  }
  // 在页面或其他组件中
  // 获取并使用全局变量 "x"
  // const app = Taro.getApp()

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
