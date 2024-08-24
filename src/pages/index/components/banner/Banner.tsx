import { Swiper, SwiperItem, View, Text, Image } from '@tarojs/components'
import { BannerType } from '@/api/types'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './banner.scss'

export default function Banner({ bannerList }: { bannerList: BannerType[] }) {

  const [activeIndex, setActiveList] = useState(0)

  const getSwiperIndex = (event) => {
    const { current } = event.detail
    setActiveList(current)
  }

  const toGoodsDetail = (id: number) => {
    Taro.navigateTo({
      url: `/modules/goodModule/pages/goods/detail/detail?goodsId=${id}}`
    })
  }

  return (
    <View className='swiper-box'>
      <Swiper
        autoplay
        className='swiper'
        interval={2000}
        duration={1000}
        onChange={getSwiperIndex}
      >
        {
          bannerList.map(item => (
            <SwiperItem className='swiper-item' key={item.id}>
              <View
                className='navigator'
                onClick={() => toGoodsDetail(item.id)}
              >
                <Image className='img' src={item.imageUrl}></Image>
              </View>
            </SwiperItem>
          ))
        }
      </Swiper>

      <View className='indicator'>
        {
          bannerList.map((item, index) => (
            <Text
              key={item.id}
              className={index === activeIndex ? 'active rectangle' : 'rectangle'}
            ></Text>
          ))
        }
      </View>
    </View>
  )
}
