import { UserInfoType } from "@/api/types/users.type";
import { RootState } from "@/store/index";
import { Button, Cell, Dialog, Form, Input } from "@taroify/core";
import { View, Text, Image, BaseEventOrig } from "@tarojs/components";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from '@/store/features/user'
import { reqUpdateUserInfo, reqUploadFile } from "@/api/user";
import { setStorage } from "@/utils/storage";
import Taro from "@tarojs/taro";
import { FormInstance } from "@taroify/core/form";
import { toast } from "@/utils/extendApi";
import avatarPng from '@/assets/images/avatar.png'

import './index.scss'

export default function Profile() {
  const dispath = useDispatch()

  const [isShowPopup, setIsShowPopup] = useState(false)
  const userInfo = useSelector<RootState, UserInfoType>(state => state.user.userInfo)

  // 选择头像
  const chooseAvatar = async (event: BaseEventOrig) => {
    const { avatarUrl } = event.detail
    const result = await reqUploadFile(avatarUrl, 'file')
    dispath(setUserInfo({
      ...userInfo,
      headimgurl: result
    }))
    setStorage('userInfo', userInfo)
  }

  // 更新昵称
  const onUpdateNickName = () => {
    setIsShowPopup(true)
  }

  // 保存
  const updateUserInfo = async () => {
    const result = await reqUpdateUserInfo(userInfo)
    if (result === null) {
      setStorage('userInfo', userInfo)
      toast('用户信息更新成功')
      setTimeout(() => {
        Taro.switchTab({
          url: `/pages/my/index`
        })
      }, 1500)
    }
  }

  const formRef = useRef<FormInstance>()

  const getNickName = () => {
    const values = formRef.current?.getValues<{ nickname: string }>()
    const nickname = values?.nickname
    dispath(setUserInfo({
      ...userInfo,
      nickname
    }))
    setIsShowPopup(false)
  }
  const headImg = userInfo.headimgurl || avatarPng

  return (
    <View className='container'>
      <View className='setting-list avatar-container'>
        <Text>头像</Text>

        <View className='avatar'>
          <Button hover-className='none' className='avatar-button' open-type='chooseAvatar' onChooseAvatar={chooseAvatar}>
            <Image className='image' src={headImg} mode='widthFix' />
          </Button>
        </View>
      </View>

      <View className='setting-list nickname' onClick={onUpdateNickName}>
        <Text className='text'>昵称</Text>
        <Text className='text'>{userInfo.nickname || '花友'}</Text>
      </View>

      <View className='footer'>
        <View className='btn' onClick={updateUserInfo}>保存</View>
      </View>

      <Dialog open={isShowPopup} onClose={setIsShowPopup}>
        <Dialog.Header>修改昵称</Dialog.Header>
        <Dialog.Content>
          <Form ref={formRef}>
            <Cell.Group inset>
              <Form.Item name='nickname' rules={[{ required: true, message: "请填写昵称" }]}>
                <Form.Control>
                  <Input placeholder='昵称' />
                </Form.Control>
              </Form.Item>
            </Cell.Group>
          </Form>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setIsShowPopup(false)}>取消</Button>
          <Button onClick={getNickName}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </View>

  )
}
