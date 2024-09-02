import { View, Text, Navigator } from '@tarojs/components'
import { Add, Arrow } from "@taroify/icons"
import { Button, Cell, Field, Form, Input, Textarea } from '@taroify/core'

export default function OrderDetail() {
  const toAddress = () => { }
  const orderAddress = {} as any
  return (
    <View className='container order'>
      {/* 收货地址区域 */}
      <View className='address-card'>
        {/* 添加收货地址 */}
        {
          !orderAddress.id ? (
            <View className='add-address' onClick={toAddress}>
              <Add size={22} />
              <View>添加收货地址</View>
            </View>
          ) : (
            <View className='order-address detail-flex'>
              <View className='address-content'>
                <View className='title'>{orderAddress.fullAddress}</View>
                <View className='info detail-flex'>
                  <Text>{orderAddress.name}</Text>
                  <Text>{orderAddress.phone}</Text>
                </View>
              </View>

              <View className='select-address'>
                {/* 添加 flag 标识，是为了区分是否是从结算支付页面进入的收货地址列表页面 */}
                {/* 如果是，在点击收货地址时，就需要给全局共享的 address 进行赋值 */}
                <Navigator
                  className='navigator'
                  url='/modules/settingModule/pages/address/list/index?flag=1'
                >
                  <Arrow size={22} />
                </Navigator>
              </View>
            </View>
          )
        }
      </View>

      {/* 订单信息区域 */}
      <View className='order-info'>
        <Form className='group'>
          <Cell.Group inset>
            <Field label='订购人姓名：' name='buyName' >
              <Input placeholder='订购人的姓名' placeholder-style='color: #969799' />
            </Field>
            <Field
              label='订购人手机号：'
              name='buyPhone'
              rules={[{ validator: (val) => /1\d{10}/.test(val), message: "请输入正确内容" }]}
            >
              <Input placeholder='订购人的手机号'
                placeholder-style='color: #969799'
              />
            </Field>
            <Field
              label='期望送达日期：'
              name='deliveryDate'
            >
              <Input placeholder='校验函数返回错误提示' />
            </Field>
            <Field
              label='订单备注：'
              name='blessing'
            >
              <Textarea className='form-textarea'
                placeholder='写上您的祝福语，给心爱的他（她）送上你的祝福（请勿填写特殊符号或表情符号）'
              />
            </Field>
          </Cell.Group>
          <View style={{ margin: "16px" }}>
            <Button shape='round' block color='primary' formType='submit'>
              提交
            </Button>
          </View>
        </Form>
      </View>
    </View>

  )
}
