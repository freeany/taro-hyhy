import Taro from "@tarojs/taro"
import { IconType, toast } from "./extendApi"
import { clearStorage } from "./storage"

interface ApiResult<T> {
  code: number
  message?: string
  data: T,
  errMsg?: string
}

// 传递的data参数不做限制， 所以是any
type TaroRequestOption = Taro.request.Option<any> & { isLoading?: boolean }

type ArrToPromise<T extends any[], R extends any[] = []> =
  T extends [infer A, ...infer B]
  ? ArrToPromise<B, [...R, Promise<A>]>
  : R



type ResponseType<T> =
  {
    data: ApiResult<T>
  }
  & { config: TaroRequestOption }
  & { isSuccess: boolean }

class TaroRequest {
  // 定义实例属性，用来设置默认请求参数
  private requestBaseConfig = {
    baseURL: process.env.TARO_APP_API, // 请求基准地址
    // 超时时间 1 分钟
    timeout: 60 * 1000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }
  constructor(params = {}) {
    this.requestBaseConfig = { ...this.requestBaseConfig, ...params }
  }
  // 定义拦截器对象
  // 需要包含请求拦截器以及响应拦截器，方便在请求之前以及响应以后时进行逻辑处理
  interceptors = {
    // 请求拦截器
    request(config: TaroRequestOption) {
      return config
    },
    async response<T>(response: ResponseType<T>): Promise<T> {
      const { isSuccess, data } = response

      // 如果 isSuccess = false，说明网络出现了问题
      if (!isSuccess) {
        toast('网络异常请重试', IconType.Error)
        return Promise.reject<T>(response)
      }

      // 如果 isSuccess = true，说明代码执行到了 success 回调函数
      // 业务状态码 === 200，接口调用成功，服务器成功返回了数据
      // 业务状态码 === 208，没有 token 或者 token 失效，需要让用户重新进行登录
      // 业务状态码既不等于 200，也不等于 208，说明出现了其他异常，需要给用户统一进行提示
      switch (data.code) {
        case 200:
          // 接口调用成功，服务器成功返回了数据，只需要将数据简化以后返回即可
          return data.data
        case 208:
          toast('登录过期，请重新登陆')
          // 既然用户需要重新进行登录，就需要把之前用户存储的信息(过期的 token) 进行清除
          clearStorage()
          Taro.navigateTo({
            url: '/pages/login/login'
          })
          return Promise.reject(response.data)
        default:
          toast('程序出现异常，请联系客服或稍后重试！', IconType.Error)
          return Promise.reject(response.data.errMsg)
      }
    },
  }

  // request 实例方法接收一个对象类型的参数
  request<T>(options: TaroRequestOption): Promise<T> {
    options = {
      url: this.requestBaseConfig.baseURL + options.url,
      ...this.requestBaseConfig,
      isLoading: false
    }
    // 在请求发送之前，添加 loading 效果
    if (options.isLoading) {
      Taro.showLoading()
    }
    // 在请求发送之前，调用请求拦截器，新增和修改请求参数
    options = this.interceptors.request(options)

    // 需要使用 Promise 封装 wx.request，处理异步请求
    return new Promise((resolve, reject) => {
      Taro.request({
        ...options,
        success: (res) => {
          const mergeRes = { data: { ...res.data }, config: options, isSuccess: true }
          const data = this.interceptors.response<T>(mergeRes)
          resolve(data)
        },
        // 当接口调用失败时会触发 fail 回调函数
        fail: (err) => {
          // 不管是成功响应还是失败响应，都需要调用响应拦截器
          const mergeErr = { data: { ...err }, config: options, isSuccess: false }
          toast('程序出现异常，请联系客服或稍后重试！', IconType.Error)
          return Promise.reject(mergeErr)
        },
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        complete: () => {
          if (options.isLoading) {
            Taro.hideLoading()
          }
        }
      })
    })
  }

  // 封装 GET 实例方法
  get<T>(url: string, data = {}, config = {}) {
    return this.request<T>({
      url,
      data,
      method: 'GET',
      ...config,
    })
  }

  // 封装 DELETE 实例方法
  del<T>(url: string, data = {}, config = {}) {
    return this.request<T>({
      url,
      data,
      method: 'DELETE',
      ...config
    })
  }

  // 封装 POST 实例方法
  post<T>(url: string, data = {}, config = {}) {
    return this.request<T>({
      url,
      data,
      method: 'POST',
      ...config
    })
  }

  // 封装 PUT 实例方法
  put<T>(url: string, data = {}, config = {}) {
    return this.request<T>({
      url,
      data,
      method: 'PUT',
      ...config
    })
  }

  // 用来处理并发请求
  all<T extends any[]>(promise: ArrToPromise<T>) {
    // 通过展开运算符接收传递的参数
    // 那么展开运算符会将传入的参数转成数组
    return Promise.all(promise)
  }
}

export default TaroRequest
