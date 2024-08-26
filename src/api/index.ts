import http from "@/utils/http";
import { AdvertisementType, BannerType, CategoryLevel1Type, GoodType } from "./types/index.type";

export const reqIndexData = () => {
  // 通过并发请求获取首页的数据，提升页面的渲染速度
  return http.all<[BannerType[], CategoryLevel1Type[], AdvertisementType[], GoodType[], GoodType[]]>(
    [
      http.get('/index/findBanner'),
      http.get('/index/findCategory1'),
      http.get('/index/advertisement'),
      http.get('/index/findListGoods'),
      http.get('/index/findRecommendGoods')
    ]
  )
}
