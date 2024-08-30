import { SwipeCell, Checkbox, Stepper, Button, Empty } from "@taroify/core";
import { View, Image, Navigator, Text } from "@tarojs/components";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Cart } from "@/api/types/cart";
import { RootState } from "@/store/index";
import { ActionBar } from "@taroify/commerce";
import { useDidHide, useDidShow } from "@tarojs/taro";
import { reqAddCart, reqCartList, reqUpdateChecked } from "@/api/cart";
import './index.scss'

type SwipeCellPosition = "left" | "right" | "cell" | "outside";

// 自定义类型，每个类型都要一个open
type CartGoods = Cart & { open?: SwipeCellPosition }

export default function CartContainer() {
  const token = useSelector<RootState, string>(state => state.user.token)
  const [cartList, setCartList] = useState<CartGoods[]>([])
  const [emptyDes, setEmptyDes] = useState('还没有添加商品，快去添加吧～')

  const totalPrice = useMemo(() => {
    const list = []
    for (let index = 0; index < num; index++) {
      list.push(index)
    }
    console.log(num, list)

    return list
  }, [cartList])

  const setOpenEvent = (cart: CartGoods, open: SwipeCellPosition, isOpen: boolean) => {
    if (isOpen) {
      closeAllSwiperCell()
    }
    const data = cartList.map(item => {
      if (item.goodsId === cart.goodsId) {
        item.open = open
      }
      return item
    })

    setCartList(data)
  }

  const closeAllSwiperCell = () => {
    const data = cartList.map(item => {
      item.open = 'cell'
      return item
    })
    setCartList(data)
  }

  const updateChecked = async (value: boolean, cart: CartGoods) => {
    // 获取最新的购买状态
    // 将最新的购买状态转换成后端接口需要使用的 0 和 1
    const isChecked = value ? 1 : 0

    // 调用接口更新服务器的购买状态
    const res = await reqUpdateChecked(cart.goodsId, isChecked)
    if (res === null) {
      // 服务器更新购买状态成功以后，获取最新的购物车列表数据更新状态
      // this.showTipGetList()

      // 通过更新本地的数据来更新页面的购买状态
      const carts = cartList.map(item => {
        if (item.goodsId === cart.goodsId) {
          item.isChecked = isChecked
        }
        return item
      })
      setCartList(carts)
    }
  }
  const changeBuyNum = async (num: number, cart: CartGoods, oldbuynum: number | string) => {
    // 获取最新的购买数量
    // 如果用户输入的购买数量大于 200，需要把购买数量设置为 200
    // 最大购买数量是 200，目前购买数量是 1，假设用户输入了 666，666 - 1 = 665，665 + 1 = 666
    // 最大购买数量是 200，如果用户输入的购买数量是 666，重置为 200， 200 - 1 = 199，199 + 1 = 200
    const newBuyNum = num > 200 ? 200 : num

    // 获取商品的 id、索引、之前的购买数量

    // 使用正则验证用户输入的购买数量，是否是 1-200 之间的正整数
    const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/

    // 对用户输入的值进行验证，验证通过 true，验证失败 false
    const regRes = reg.test(String(newBuyNum))

    // 如果验证没有通过，说明用户输入的购买数量不合法或者小于 1，需要还原为之前的购买数量
    if (!regRes) {
      // 如果验证没有通过，需要阻止代码继续往下运行
      return
    }

    // 如果验证通过，就需要计算差值，然后把差值发送给公司的服务器，让服务器进行逻辑处理
    const disCount = newBuyNum - Number(oldbuynum)

    // 判断购买数量是否发生了改变，如果购买数量没有发生改变，不发送请求
    if (disCount === 0) return

    // 如果购买数量发生了改变，需要调用接口，传递差值
    const res = await reqAddCart({ goodsId: cart.goodsId, count: disCount })

    if (res === null) {
      // 如果服务器更新购买数量成功，需要更新本地的购买数量
      const carts = cartList.map(item => {
        if (item.goodsId === cart.goodsId) {
          item.count = newBuyNum
          item.isChecked = 1
        }
        return item
      })

      setCartList(carts)
    }
  }

  const delCartGoods = (cart) => {
    console.log(cart, 'cart...');

  }

  const selectAllStatus = false

  const onSelectAllStatus = () => { }

  // 获取购物车列表
  const showTipGetList = async () => {
    // 判断用户是否进行了登录
    if (!token) {
      setEmptyDes('您尚未登录，点击登录获取更多权益')
      setCartList([])
      return
    }

    // 如果用户进行了登录，就需要获取购物车列表数据
    const data = await reqCartList<CartGoods>()
    const cartGoodsList = data.map(item => {
      item.open = 'cell'
      return item
    })
    setCartList(cartGoodsList)
    if (cartGoodsList.length === 0) {
      setEmptyDes('还没有添加商品，快去添加吧～')
    }
  }
  useDidShow(() => {
    showTipGetList()
    closeAllSwiperCell()
  })
  useDidHide(() => {
    closeAllSwiperCell()
  })

  return (
    <View onClick={closeAllSwiperCell} className='cart container page-container'>
      {/* 购物车列表结构 */}
      {
        token && cartList.length ? (<View
          className='container goods-wrap'
        >
          {
            cartList.map(cart => (
              <View className='goods-item' key={cart.goodsId}>
                <SwipeCell
                  open={cart.open}
                  onOpen={(open) => setOpenEvent(cart, open, true)}
                  onClose={(open) => setOpenEvent(cart, open, false)}
                  className='goods-swipe'
                >
                  <View className='goods-info'>
                    <View className='left'>
                      <Checkbox checked={cart.isChecked === 0 ? false : true} onChange={(value) => updateChecked(value, cart)}></Checkbox>
                    </View>
                    <View className='mid'>
                      <Image className='img' src={cart.imageUrl} />
                    </View>
                    <View className='right'>
                      <View className='title'> {cart.name} </View>
                      <View className='buy'>
                        <View className='price'>
                          <View className='symbol'>¥</View>
                          <View className='num'>{cart.price}</View>
                        </View>
                        <View className='buy-btn'>
                          <Stepper min={1} max={200} value={cart.count} onChange={
                            (value: number) => changeBuyNum(value, cart, cart.count)
                          }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <SwipeCell.Actions side='right'>
                    <Button variant='contained' shape='square' color='danger' onClick={() => delCartGoods(cart)}>
                      删除
                    </Button>
                  </SwipeCell.Actions>
                </SwipeCell>
              </View>
            ))
          }
        </View>) : (
          <View >
            {/* 购物车列表为空展示的结构 */}
            <Empty >
              <Empty.Image />
              <Empty.Description>
                <View>
                  {emptyDes}
                </View>
                {
                  token && cartList.length === 0 ? (
                    <Navigator
                      url='/pages/index/index'
                      open-type='switchTab'
                    >
                      <Button className='bottom-button' variant='contained' shape='round' color='danger'>
                        去购物
                      </Button>
                    </Navigator>) : (
                    <Navigator url='/pages/login/index' className='cart-empty'>
                      <Button className='bottom-button' variant='contained' shape='round' color='danger'>
                        去登录
                      </Button>
                    </Navigator>)
                }
              </Empty.Description>
            </Empty>
          </View>

        )
      }

      {/* 底部工具栏 */}
      {/* 底部工具栏组件展示价格，默认是以 分 的形式进行展示，如果需要以 元 的方式进行展示 */}
      <ActionBar fixed placeholder className='action-bar'>
        <Checkbox
          checked={selectAllStatus}
          checked-color='#FA4126'
          onChange={onSelectAllStatus}
        >
          全选
        </Checkbox>
        <View className='computed-total'>
          合计:<Text className='total-price'>￥{totalPrice * 100}</Text>
        </View>
        <Button className='order-btn' variant='contained' shape='round' color='danger'>
          去结算
        </Button>
      </ActionBar>
    </View>
  )
}
