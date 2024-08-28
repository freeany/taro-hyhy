import { useCallback, useMemo, useState } from 'react'
import { View, Image, Text, Navigator, Textarea } from '@tarojs/components'
import { Goods } from '@/modules/goodModule/api/types/goods'
import Taro, { useLoad } from '@tarojs/taro'
import { ActionBar } from "@taroify/commerce"
import { CartOutlined, ChatOutlined, HomeOutlined } from "@taroify/icons"
import { reqGoodsInfo } from '@/modules/goodModule/api/goods'
import { ActionSheet, Button, Stepper } from '@taroify/core'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { reqAddCart, reqCartList } from '@/api/cart'
import { toast } from '@/utils/extendApi'
import './index.scss'


export default function GoodsDetail() {
  const [goodsInfo, setGoodsInfo] = useState<Goods>() // 商品信息
  const [show, setShow] = useState(false) // 是否打开
  const [count, setCount] = useState(0) // 购物车数量
  const [blessing, setBlessing] = useState('') // 祝福语
  const [buyNow, setBuyNow] = useState<0 | 1>(0) //  0，说明是加入购物车。 1，说明是立即购买
  const [allCount, setAllCount] = useState<number | '99+'>(0) // 购物车数量
  const [goodsId, setGoodsId] = useState(null) // 商品id

  const previewImage = useCallback(() => {
    Taro.previewImage({
      urls: goodsInfo!.detailList
    })
  }, [goodsInfo])

  // 加入购物车
  const handleAddcart = useCallback(() => {
    setShow(true)
    setBuyNow(0)
  }, [])

  // 立即购买
  const handeGotoBuy = useCallback(() => {
    setShow(true)
    setBuyNow(1)
  }, [])

  const getGoodsInfo = async (gId) => {
    const data = await reqGoodsInfo(gId)
    setGoodsInfo(data)
  }

  useLoad((options) => {
    const gId = options.goodsId
    setGoodsId(gId)
    getGoodsInfo(gId)

    getCartCount()
  })

  const onChangeGoodsCount = useCallback((value) => {
    setCount(value)
  }, [])

  const onChangeBlessingTextArea = useCallback((e) => {
    setBlessing(e.detail.value)
  },[])

  // 计算购物车商品的数量
  const getCartCount = async () => {
    // 使用 token 来判断用户是否进行了登录，
    // 如果没有 token，说明用户没有登录，就不执行后续的逻辑
    if (!token) return
    // 如果存在 token，说明用户进行了登录，获取购物车列表的数据
    // 然后计算得出购买的数量
    const res = await reqCartList()

    console.log(res, 'res...');

    // 判断购物车中是否存在商品
    if (res.length !== 0) {
      // 累加得出的商品购买数量
      let allCartCount = 0
      res.forEach((item) => {
        allCartCount += item.count
      })
      setAllCount(allCartCount > 99 ? '99+' : allCartCount)
    } else {
      setAllCount(0)
    }
  }
  const token = useSelector<RootState, string>(state => state.user.token)
  const handleSubmit = async () => {
    // 判断用户是否进行了登录，如果没有登录，需要跳转到登录页面
    if (!token) {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
      return
    }

    // 区分处理加入购物车已经立即购买
    // 如果 buyNow === 0，说明是加入购物车，
    // 如果 buyNow === 1，说明是立即购买
    if (buyNow === 0) {
      const res = await reqAddCart({ goodsId, count, blessing })
      if (!res) {
        toast('加入购物车成功')
        // 在加入购物车成功以后，需要重新计算购物车商品的购买数量
        getCartCount()
        setShow(false)
      }
    } else {
      Taro.navigateTo({
        url: `/modules/orderPayModule/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`
      })
    }
  }
  return (
    <View>
      {
        goodsInfo ? (<View className='container goods-detail'>
          {/* 商品大图 */}
          <View className='banner-img'>
            <Image className='img image' src={goodsInfo.imageUrl} onClick={previewImage} />
          </View>

          {/* 商品的基本信息 */}
          <View className='content'>
            <View className='price'>
              <View className='price-num'>¥{goodsInfo.price}</View>
              <View className='price-origin-num'>¥{goodsInfo.marketPrice}</View>
            </View>
            <View className='title'>{goodsInfo.name}</View>
            <View className='desc'>{goodsInfo.floralLanguage}</View>
          </View>

          {/* 商品的详细信息 */}
          <View className='detail'>
            {
              goodsInfo.detailList.map((detail, index) => (
                <Image
                  key={index}
                  className='img image'
                  mode='widthFix'
                  src={detail}
                />
              ))
            }
          </View>

          {/* 商品的底部商品导航 */}
          <View className='action-bottom--bar'>
            <ActionBar fixed placeholder>
              <Navigator url='/pages/index/index' open-type='switchTab'>
                <ActionBar.IconButton >
                  <HomeOutlined />
                  <Text>首页</Text>
                </ActionBar.IconButton>
              </Navigator>
              <Navigator url='/pages/cart/index' open-type='switchTab'>
                <ActionBar.IconButton badge={allCount === 0 ? null : allCount}>
                  <CartOutlined />
                  <Text>购物车</Text>
                </ActionBar.IconButton>
              </Navigator>
              <ActionBar.IconButton open-type='contact' badge>
                <ChatOutlined />
                <Text>客服</Text>
              </ActionBar.IconButton>
              <ActionBar.ButtonGroup>
                <ActionBar.Button color='warning' onClick={handleAddcart}>加入购物车</ActionBar.Button>
                <ActionBar.Button color='danger' onClick={handeGotoBuy}>立即购买</ActionBar.Button>
              </ActionBar.ButtonGroup>
            </ActionBar>
          </View>

          {/* 加入购物车、立即购买弹框 */}
          {/* show 控制弹框的隐藏和展示 */}
          {/* bind:close 点击关闭弹框时触发的回调 */}
          <ActionSheet open={show} onClose={setShow}>
            <View className='sheet-wrapper'>
              <View className='goods-item'>
                {/* 需要购买的商品图片 */}
                <View className='mid'>
                  <Image className='img' src={goodsInfo.imageUrl} />
                </View>

                {/* 商品基本信息 */}
                <View className='right'>
                  {/* 商品名字 */}
                  <View className='title'>{goodsInfo.name}</View>
                  {/* 商品价格 */}
                  <View className='buy'>
                    <View className='price'>
                      <View className='symbol'>¥</View>
                      <View className='num'>{goodsInfo.price}</View>
                    </View>
                    {/* 步进器组件控制购买数量 */}
                    {
                      buyNow === 0 ?
                        <View className='buy-btn'>
                          {/* Stepper 步进器，由增加按钮、减少按钮和输入框组成，控制购买数量 */}
                          <Stepper min={1} max={200} value={count} onChange={onChangeGoodsCount} />
                        </View>
                        : null
                    }
                  </View>
                </View>
              </View>

              {/* 祝福语输入框 */}
              <View className='time-wraper'>
                <View className='title'>祝福语</View>
                <Textarea
                  value={blessing}
                  onInput={onChangeBlessingTextArea}
                  className='form-textarea'
                  placeholder='必填，写上您的祝福语，给心爱的他（她）送上你的祝福（请勿填写特殊符号或表情符号）'
                />
              </View>

              {/* 确定按钮 */}
              <View className='sheet-footer-btn'>
                <Button block color='primary' shape='round' onClick={handleSubmit}> 确定 </Button>
              </View>
            </View>
          </ActionSheet>
        </View>)
          : null
      }

    </View>
  )
}
