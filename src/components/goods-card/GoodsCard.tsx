import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import addCartPng from '@/assets/images/buybtn.png'
import { Goods } from "@/modules/goodModule/api/types/goods";
import './goodsCard.scss'

// 列表分类卡片
export default function GoodsCard({ goodItem }: { goodItem: Goods }) {
  return (
    <View className='goods_cart_container'>
      <View
        className='navigator_nav'
        onClick={() => {
          Taro.navigateTo({
            url: `/modules/goodModule/pages/goods/detail/detail?goodsId=${goodItem.id}`
          })
        }}
      >
        {/* 商品图片 */}
        <Image className='good_img' src={goodItem.imageUrl} mode='widthFix' />
        {/* 商品详细信息 */}
        <View className='goods_item_info'>
          {/* 商品名称 */}
          <Text className='goods_item_info_name'>{goodItem.name}</Text>
          {/* 商品描述 */}
          <Text className='goods_item_info_promo'>{goodItem.floralLanguage}</Text>
          {/* 商品价格 */}
          <View className='goods_item_info_bottom'>
            <View className='goods_item_info_price'>
              <Text className='Text'>¥</Text>{goodItem.price}
            </View>
            <View className='goods_item_info_origin_price'>
              <Text className='Text'>¥</Text> {goodItem.marketPrice}
            </View>
            {/* 加入购物车图片 */}
            <View className='goods_item_info_btn'>
              <Image className='goods_image' src={addCartPng} mode='widthFix' />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

