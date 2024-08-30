import { View } from "@tarojs/components";
import { useCallback, useEffect, useState } from "react";
import { Button, Empty } from "@taroify/core"
import Taro, { useLoad, usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import GoodsCard from "@/components/goods-card/GoodsCard";
import { reqGoodsList } from "@/modules/goodModule/api/goods";
import type { Goods } from "@/modules/goodModule/api/types/goods";

import './index.scss'

export default function GoodsList() {
  const [goodsList, setGoodsList] = useState<Goods[]>([])
  const [isFinish, setIsFinish] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [requestParams, setRequestParams] = useState({
    page: 1, // 页码
    limit: 10, // 每页请求的条数
    category1Id: '', // 一级分类 id
    category2Id: '' // 二级分类 id
  })

  console.log(123);

  const getGoodsList = useCallback(async () => {
    setIsLoading(true)
    const result = await reqGoodsList(requestParams)
    setGoodsList([...goodsList, ...result.records])
    setTotal(result.total)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestParams])

  useLoad((options) => {
    setRequestParams({
      ...requestParams,
      category2Id: options.category2Id,
    })
  })

  useEffect(() => {
    if (!requestParams.category2Id) return
    getGoodsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestParams])

  usePullDownRefresh(() => {
    // 将数据进行重置
    setGoodsList([])
    setTotal(0)
    setIsFinish(false)
    setRequestParams({
      ...requestParams,
      page: 1
    })
    // 手动关闭下拉刷新的效果
    Taro.stopPullDownRefresh()
  })

  // 上拉操作
  useReachBottom(() => {
    // 判断 isLoading 状态
    // 如果状态等于 true，说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if (isLoading) return
    // 让 goodsList 长度 和 total 进行对比
    // 如果数据相等，商品列表已经加载完毕
    if (goodsList.length === total) {
      setIsFinish(true)
      return
    }

    // 页码 + 1
    setRequestParams({
      ...requestParams,
      page: requestParams.page + 1
    })
  })

  return (
    <View className='container'>
      {/* 商品列表功能 */}
      {
        goodsList.length ? (
          <View className='goods-list'>
            {
              goodsList.map(item => (
                <GoodsCard goodItem={item} key={item.id}></GoodsCard>
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
    </View>
  )
}
