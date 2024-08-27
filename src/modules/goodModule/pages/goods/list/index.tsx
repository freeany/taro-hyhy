import { View } from "@tarojs/components";
import { useState } from "react";
import { Button, Empty } from "@taroify/core"
import Taro, { useLoad } from "@tarojs/taro";
import GoodsCard from "@/components/goods-card/GoodsCard";

export default function GoodsList() {
  const [goodsList, setGoodsList] = useState([])
  const [isFinish, setIsFinish] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const requestParams = useState({
    page: 1, // 页码
    limit: 10, // 每页请求的条数
    category1Id: '', // 一级分类 id
    category2Id: '' // 二级分类 id
  })

  const getGoodsList = () => {
    const result = reqGoodsList(requestParams)

  }

  useLoad((options) => {

  })

  return (
    <View className='container'>
      {/* 商品列表功能 */}
      {
        goodsList.length ? (
          <View className='goods-list'>
            {
              goodsList.map(item => (
                // <GoodsCard goodItem={item} key={ item.id }></GoodsCard>
                <View>2</View>
              ))
            }

            {/* 数据是否加载完毕 */}
            {
              isFinish ? <View className='finish'>数据加载完毕~~~</View> : null
            }
          </View>
        ) : (
          // {/* 商品为空的时候展示的结构 */}
          <Empty>
            <Empty.Image />
            <Empty.Description>该分类下暂无商品，去看看其他商品吧～</Empty.Description>
            <Button shape='round' color='danger' className='bottom-button' onClick={() => {
              Taro.navigateBack()
            }}
            >
              查看其他商品
            </Button>
          </Empty>

        )
      }
      {/* <van-empty wx:else description='该分类下暂无商品，去看看其他商品吧～'>
        <van-button round type='danger' className='bottom-button' bindtap='gotoBack'>
          查看其他商品
        </van-button>
      </van-empty> */}
    </View>

  )
}
