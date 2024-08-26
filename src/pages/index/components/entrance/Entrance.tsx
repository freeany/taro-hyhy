import { CategoryLevel1Type } from '@/api/types/index.type'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import './entrance.scss'

export default function Entrance({ cateList }: { cateList: CategoryLevel1Type[] }) {
  const navigateTo = (category) => {
    const url = `/modules/goodModule/pages/goods/list/list?category1Id=${category.id}`
    Taro.navigateTo({
      url
    })
  }
  return (
    <View className='nav-list'>
      {/* 一级分类导航容器 */}
      {
        cateList.map((category, index) => (
          <View
            key={category.id}
            className={classnames("nav-item", { small: index >= 5 })}
          >
            {/* 导航链接 */}
            <View className='navigator-nav' onClick={() => navigateTo(category)} >
            <Image className='nav-img' src={category.imageUrl} />
            <Text className='nav-text'>{ category.name }</Text>
          </View>
        </View>
        ))
      }
    </View>
  )
}
