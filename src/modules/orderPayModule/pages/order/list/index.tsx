import { reqOrderList } from '@/modules/orderPayModule/api/orderpay'
import { toast } from '@/utils/extendApi'
import { Empty } from '@taroify/core'
import { View, Text, Image } from '@tarojs/components'
import { useLoad, useReachBottom } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function OrderList() {
  const [orderList, setOrderList] = useState<any[]>([])
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  })
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // 获取订单列表
  const getOrderList = async () => {
    // 解构获取数据
    const { page, limit } = pageInfo

    // 数据正在请求中
    setLoading(true)

    // 调用接口获取订单列表数据
    const res = await reqOrderList(page, limit)

    // 数据加载完毕
    setLoading(false)

    setOrderList([...orderList, ...res.records])
    setTotal(res.total)
  }

  // 页面上拉触底事件的处理函数
  useReachBottom(() => {
    if (loading) return

    // 数据总条数 和 订单列表长度进行对比
    if (total === orderList.length) {
      toast('数据加载完毕')
      return
    }

    // 更新 page
    setPageInfo({
      ...pageInfo,
      page: pageInfo.page + 1
    })

    // 重新发送请求
    getOrderList()
  })


  useLoad(() => {
    getOrderList()
  })

  return (
    <View className='order-container container'>
      {
        orderList.length > 0 ? (
          <View className='order-list'>
            {
              orderList.map(item => (
                <View className='order-item' key={item.id}>
                  <View className='order-item-header list-flex'>
                    <View className='orderno'>订单号<Text className='no'>{item.orderNo}</Text></View>
                    <View className="order-status { item.orderStatus === 1 ? 'order-active' : '' }">
                      {item.orderStatus === 1 ? '已支付' : '未支付'}
                    </View>
                  </View>
                  {
                    item.orderDetailList.map(goods => (
                      <View
                        className='goods-item list-flex'
                        key={goods.id}
                      >
                        <View className='left'>
                          <Image src={goods.imageUrl} mode='widthFix' className='img' />
                        </View>
                        <View className='mid'>
                          <View className='goods-name'>{goods.name}</View>
                          <View className='goods-blessing'>{goods.blessing}</View>
                        </View>
                        <View className='right'>
                          <View className='goods-price'>¥{goods.price}</View>
                          <View className='goods-count'>x{goods.count}</View>
                        </View>
                      </View>
                    ))
                  }
                  <View className='order-item-footer'>
                    <View className='total-amount list-flex'>
                      <Text className='Text'>实付</Text>
                      <Text className='price'><Text>¥</Text>{item.totalAmount}</Text>
                    </View>
                  </View>
                </View>
              ))
            }
          </View>
        ) : (
          <Empty>
            <Empty.Image />
            <Empty.Description>还没有购买商品，快去购买吧～</Empty.Description>
          </Empty>
        )
      }
    </View>
  )
}
