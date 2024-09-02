import { reqAddAddress, reqAddressInfo, reqUpdateAddress } from '@/modules/settingModule/api/address';
import QQMapWX from '@/modules/settingModule/libs/qqmap-wx-jssdk.min';
import { toast } from '@/utils/extendApi';
import { Button, Field, Form, Input, Switch, Textarea } from '@taroify/core'
import { FormInstance, FormItemInstance } from '@taroify/core/form';
import { View, Picker, BaseEventOrig, FormProps, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro';
import { useMemo, useRef, useState } from 'react';

import './index.scss'

export default function AddressAdd() {
  const [addressId, setAddressId] = useState()
  const [addressRegion, setAddressRegion] = useState(['', '', ''])
  const [addressRegionCode, setAddressRegionCode] = useState(['', '', ''])

  const formRef = useRef<FormInstance>()
  const locationRef = useRef<FormItemInstance>()

  const onLocation = async () => {
    // 打开地图让用户选择地理位置
    const { latitude, longitude, name } = await Taro.chooseLocation({})

    let qqmapwx = new QQMapWX({
      // key 要使用自己申请的 key
      // 在进行逆解析的时候，如果发现 key 只能使用一次，需要在腾讯位置服务后台配置额度
      key: 'S5CBZ-TQXCB-L73UJ-J6VJA-FXS53-JNBY3'
    })

    // 使用 reverseGeocoder 方法进行逆地址解析
    qqmapwx.reverseGeocoder({
      location: {
        longitude,
        latitude
      },
      success: (res) => {
        // 获取省市区、省市区编码
        const { adcode, province, city, district } = res.result.ad_info

        // 获取街道、门牌 (街道、门牌 可能为空)
        const { street, street_number } = res.result.address_component

        setAddressRegion([province, city, district])
        setAddressRegionCode([
          adcode.replace(adcode.substring(2, 6), '0000'),
          adcode.replace(adcode.substring(4, 6), '00'),
          district && adcode
        ])

        locationRef.current?.setValue(street + street_number + name)
      },
      fail: (err) => {
        console.log(err, 'err..');
      }
    })
  }

  const showAddressInfo = async (id) => {
    Taro.setNavigationBarTitle({
      title: '更新收货地址'
    })
    const data = await reqAddressInfo(id)
    const { provinceName, cityName, districtName, provinceCode, cityCode, districtCode } = data


    formRef.current?.setValues({
      name: data.name,
      phone: data.phone,
      address: data.address,
      isDefault: data.isDefault === 1 ? true : false
    })

    setAddressRegion([provinceName, cityName, districtName])
    setAddressRegionCode([provinceCode, cityCode, districtCode])
  }

  useLoad((options) => {
    setAddressId(options.id)



    showAddressInfo(options.id)
  })

  const saveAddrssForm = async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const { name, phone, address, isDefault: dft } = event.detail.value!
    const [provinceName, cityName, districtName] = addressRegion
    const [provinceCode, cityCode, districtCode] = addressRegionCode
    const fullAddress = provinceName + cityName + districtName + address
    const params = {
      name, phone, address,
      provinceName, cityName, districtName,
      provinceCode, cityCode, districtCode,
      fullAddress,
      isDefault: dft ? 1 : 0
    }

    const res = addressId ? await reqUpdateAddress({ id: addressId, ...params }) : await reqAddAddress(params)
    if (res === null) {
      Taro.navigateBack({
        success: () => {
          toast(addressId ? '更新收货地址成功！' : '新增收货地址成功！')
        }
      })
    }
  }

  let addressRegoinText = useMemo(() => {
    const [provinceName, cityName, districtName] = addressRegion
    return provinceName + ' ' + cityName + ' ' + districtName
  }, [addressRegion])

  const onAddressChange = ({ detail }) => {
    const { value, code } = detail
    // const [provinceCode, cityCode, districtCode] = code
    setAddressRegionCode(code)
    setAddressRegion(value)
  }

  return (
    <View className='container address'>
      <Form onSubmit={saveAddrssForm} ref={formRef}>
        <Field label='收货人' name='name' required>
          <Input
            placeholder-style='color: #969799'
            placeholder='请输入收货人姓名'
          />
        </Field>
        <Field
          label='手机号码'
          name='phone'
          rules={[{ validator: (val) => /1\d{10}/.test(val), message: "请输入正确的手机号" }]}
          required
        >
          <Input
            placeholder-style='color: #969799'
            placeholder='请输入收货人手机号'
          />
        </Field>
        <Field
          label='所在地区'
          name='code'
          required
        >
          <Picker
            mode='region'
            value={addressRegion}
            onChange={onAddressChange}
          >
            {
              addressRegoinText.replace(/ /g, '') ? (<View className='region'>
                {addressRegoinText}
              </View>) : (
                <View className='placeholder'> 请选择收货人所在地区</View>
              )
            }
          </Picker>
          <View className='location' onClick={onLocation}>
            <Text>定位</Text>
          </View>
        </Field>
        <Field
          label='详细地址'
          name='address'
          required
          ref={locationRef}
        >
          <Textarea
            auto-height
            placeholder-style='color: #969799'
            placeholder='请输入详细地址'
          />
        </Field>
        <Field
          label='默认地址'
          name='isDefault'
        >
          <Switch size={20} />
        </Field>
        <View style={{ margin: "16px" }}>
          <Button shape='round' block color='primary' formType='submit'>
            提交
          </Button>
        </View>
      </Form>
    </View>
  )
}
