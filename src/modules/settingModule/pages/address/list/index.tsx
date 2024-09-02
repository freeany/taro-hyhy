import { Address } from '@/modules/settingModule/api/types/address'
import { Button, Empty, SwipeCell } from '@taroify/core'
import { View, Navigator, Text } from '@tarojs/components'
import Taro, { useDidShow, useLoad } from '@tarojs/taro';
import { useState } from 'react'
import { Edit } from "@taroify/icons"
import { modal, toast } from '@/utils/extendApi';
import { reqAddressList, reqDelAddress } from '@/modules/settingModule/api/address';
import './index.scss'

type SwipeCellPosition = "left" | "right" | "cell" | "outside";

export default function AddressList() {
  type AddressWithOpen = Address & { open?: SwipeCellPosition }
  const [addressList, setAddressList] = useState<AddressWithOpen[]>([])
  const [flag, setFlag] = useState('1')
  useLoad((options) => {
    console.log('onload...');
    setFlag(options.flag)
  })

  useDidShow(() => {
    getAddressList()
  })

  const getAddressList = async () =>{
    const res = await reqAddressList()
    setAddressList(res)
  }

  const setOpenEvent = (address: AddressWithOpen, open: SwipeCellPosition, isOpen: boolean) => {
    if (isOpen) {
      closeAllSwiperCell()
    }
    const data = addressList.map(item => {
      if (item.id === address.id) {
        item.open = open
      }
      return item
    })

    setAddressList(data)
  }

  const closeAllSwiperCell = () => {
    const data = addressList.map(item => {
      item.open = 'cell'
      return item
    })
    setAddressList(data)
  }

  const changeAddress = (address: AddressWithOpen) => {
    if (flag !== '1') return
    const addressId = address.id
    const selectAddress = addressList.find((item) => item.id === addressId)
    if (selectAddress) {
      // app.globalData.address = selectAddress
      Taro.navigateBack()
    }
  }

  // 编辑
  const toEdit = (address: AddressWithOpen) => {
    const { id } = address
    Taro.navigateTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`
    })
  }


  // 删除
  const delAddress = async (address: AddressWithOpen) => {
    const { id } = address
    const modalRes = await modal({
      content: '您确认删除该收货地址吗 ?'
    })
    if (modalRes) {
      await reqDelAddress(id)
      toast('收货地址删除成功')
      getAddressList()
    }
  }

  return (
    <View className='container address-list' onClick={closeAllSwiperCell}>
      {
        addressList.length > 0 ? (
          <View className='list-warpper'>
            {
              addressList.map(item => (
                <View key={item.id} className='list-item'>
                  <SwipeCell
                    open={item.open}
                    onOpen={(open) => setOpenEvent(item, open, true)}
                    onClose={(open) => setOpenEvent(item, open, false)}
                  >
                    <View className='list-item-box'>
                      <View className='info' onClick={() => changeAddress(item)} >
                        <View className='user-info'>
                          <Text>{item.name}</Text>
                          <Text>{item.phone}</Text>
                          {
                            item.isDefault === 1 ? <Text className='default-tag'>默认</Text> : null
                          }
                        </View>

                        <View className='address-info'>{item.fullAddress}</View>
                      </View>

                      <View className='editBtn' onClick={() => toEdit(item)} >
                        <Edit size='22px' color='#999'></Edit>
                      </View>
                    </View>
                    <SwipeCell.Actions side='right'>
                      <Button variant='contained' shape='square' color='danger' onClick={() => delAddress(item)}>
                        删除
                      </Button>
                    </SwipeCell.Actions>
                  </SwipeCell>
                </View>
              ))
            }
          </View>
        ) : (

          <Empty >
            <Empty.Image />
            <Empty.Description>
              <View>
                还没有收货地址，快去添加吧～
              </View>
            </Empty.Description>
          </Empty>)
      }
      <View className='footer'>
        <View className='btn'>
          <Navigator url='/modules/settingModule/pages/address/add/index'>
            新增地址
          </Navigator>
        </View>
      </View>
    </View>
  )
}
