import { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { reqIndexData } from '@/api/index'
import Taro, { useLoad } from '@tarojs/taro'
import { AdvertisementType, BannerType, CategoryLevel1Type, GoodType } from '@/api/types'
import Banner from '@/components/Banner'
import './index.scss'



export default function Index() {
  // [BannerType, CategoryLevel1Type, AdvertisementType, GoodType, GoodType]
  const [bannerList, setBannerList] = useState<BannerType[]>([])
  const [categoryList, setCategoryList] = useState<CategoryLevel1Type[]>([])
  const [activeList, setActiveList] = useState<AdvertisementType[]>([])
  const [guessList, setGuessList] = useState<GoodType[]>([])
  const [hotList, setHotList] = useState<GoodType[]>([])
  const [loading, setLoading] = useState(false)

  // 获取首页数据
  const getIndexData = async () => {
    const [bannerList, categoryList, activeList, guessList, hotList] = await reqIndexData();

    setBannerList(bannerList)
    setCategoryList(categoryList)
    setActiveList(activeList)
    setGuessList(guessList)
    setHotList(hotList)
  }

  useLoad(() => {
    getIndexData()
  })

  const handleAdvClick = (categoryId: number) => {
    Taro.navigateTo({
      url: `/modules/goodModule/pages/goods/list/list?category2Id=${categoryId}`
    })
  }

  return (
    <View className='index page-container'>
      <View className="index-container">
        {/* 首页背景图 */}
        <View className="window-bgc"></View>

        {/* 页面主体区域 */}
        <View className="container">
          {/* 轮播图区域 */}
          <Banner bannerList={bannerList} />
          {/* 导航分类 */}
          {/* <entrance cateList="{{ categoryList }}" /> */}

          {/* 广告区域 */}
          <View className="adver">
            <View className="adver-left">
              <View onClick={() => handleAdvClick(activeList[0]?.category2Id)}>
                <Image className='image' src={activeList[0]?.imageUrl} mode="widthFix"></Image>
              </View>
            </View>

            <View className="adver-right">
              <View>
                <View onClick={() => handleAdvClick(activeList[1]?.category2Id)}>
                  <Image className='image' src={activeList[1]?.imageUrl} mode="widthFix"></Image>
                </View>
              </View>
              <View className='view'>
                <View onClick={() => handleAdvClick(activeList[2]?.category2Id)}>
                  <Image className='image' src={activeList[2]?.imageUrl} mode="widthFix"></Image>
                </View>
              </View>
            </View>
          </View>

          {/* 商品列表 */}
          {/* <goods-list title="猜你喜欢" list="{{ guessList }}"></goods-list> */}
          {/* <goods-list title="人气推荐" list="{{ hotList }}"></goods-list> */}
        </View>
      </View>

    </View>
  )
}
