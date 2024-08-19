// 导入模块、包提供的类
import TaroRequest from './request'

// 对类进行实例化
const instance = new TaroRequest({
  baseURL: process.env.TARO_APP_API, // 请求基准地址
  timeout: 15000
})

// 导出实例
export default instance
