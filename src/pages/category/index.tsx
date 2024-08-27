import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { Category } from '@/api/types/category'
import { reqCategoryData } from '@/api/category'
import classNames from 'classnames'

import './index.scss'

export default function Cart() {

  const [categoryList, setCategoryList] = useState<Category[]>([]) // 分类数据列表
  const [activeIndex, setActiveIndex] = useState(0) // 当前选中

  const handleClickCategory = (index) => {
    setActiveIndex(index)
  }

  const getCategoryData = async () => {
    // 调用接口获取分类的数据
    const res = await reqCategoryData()
    setCategoryList(res)
  }

  useLoad(() => {
    getCategoryData()
  })

  return (
    <View className='category page-container category-container'>
      {/* 左侧的滚动视图区域 */}
      <ScrollView className='category-left-view' scrollY scrollWithAnimation type='list'>
        {/* 一级分类 */}
        {
          categoryList.map((category, index) => (
            <View
              className={classNames('left-view-item', { 'active': activeIndex === index })}
              key={category.id}
              onClick={() => handleClickCategory(index)}
            >
              {category.name}
            </View>
          ))
        }

      </ScrollView>

      {/* 右侧的滚动视图区域 */}
      <ScrollView className='category-right-view' scrollY scrollWithAnimation type='list'>
        {/* 二级分类 */}
        <View className='test'>
          {
            categoryList[activeIndex] ?
              categoryList[activeIndex].children.map(category => (
                <View key={category.id} className='right-view-item'>
                  <View
                    className='navigator'
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/modules/goodModule/pages/goods/list/index?category2Id=${category.id}`
                      })
                    }}
                  >
                    <Image className='image' src={category.imageUrl}></Image>
                    <Text  className='text goods_item_name'>{category.name}</Text>
                  </View>
                </View>
              )) : null
          }
        </View>
      </ScrollView>
    </View>
  )
}
