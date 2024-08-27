import { GoodType } from '@/api/types/index.type'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import GoodsCard from '../goods-card/GoodsCard'
import './goodsList.scss'

// 商品列表组件
export default function GoodsList({ title, goodList }: { title: string, goodList: GoodType[] }) {
  return (
    <>
      {
        goodList.length > 0 ?
          <View className='goods_container'>
            {/* 标题 */}
            <View className='goods_title'>{title}</View>

            {/* 列表区域 */}
            <View className='goods_card_list'>
              {
                goodList.map(item => (
                  <GoodsCard key={item.id} goodItem={item}></GoodsCard>
                ))
              }
            </View>
            {/* 查看更多 */}
            <View className='goods_more'>
              <View
                className='goods_more_btn'
                onClick={() => {
                  Taro.navigateTo({
                    url: '/modules/goodModule/pages/goods/list/index'
                  })
                }}
                hover-className='navigator-hover'
                open-type='navigate'
              >
                查看更多
              </View>
            </View>
          </View>
          : null
      }
    </>
  )
}
