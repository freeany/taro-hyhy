// 导入封装的网络请求模块实例
import http from '@/utils/http'
import { Category } from './types/category'

/**
 * @description 获取商品分类的数据
 * @returns Promise
 */
export const reqCategoryData = () => {
  return http.get<Category[]>('/index/findCategoryTree')
}
