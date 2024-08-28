import http from '@/utils/http'
import { Goods, GoodsListData } from './types/goods'

/**
 * @description 获取商品列表数据
 */
export const reqGoodsList = ({ page, limit, category1Id, category2Id }: { page: number, limit: number, category1Id: string, category2Id: string }) => {
  return http.get<GoodsListData>(`/goods/list/${page}/${limit}`, {
    category1Id, category2Id
  })
}

/**
 * @description 获取商品的详情
 * @param {*} goodsId 商品的 id
 */
export const reqGoodsInfo = (goodsId: string) => {
  return http.get<Goods>(`/goods/${goodsId}`)
}
