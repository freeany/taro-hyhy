import http from '@/utils/http'
import { UserInfoType } from './types/users.type'

/**
 * @description 进行登录操作
 * @param {*} code 临时登录凭证
 * @returns Promise
 */
export const reqLogin = (code) => {
  return http.get<{ token: string }>(`/weixin/wxLogin/${code}`)
}

/**
 * @description 获取用户信息
 * @returns Promise
 */
export const reqUserInfo = () => {
  return http.get<UserInfoType>('/weixin/getuserInfo')
}

/**
 * @description 更新用户信息
 * @param {*} userInfo 最新的头像和昵称
 * @returns Promise
 */
export const reqUpdateUserInfo = (userInfo) => {
  return http.post<UserInfoType>('/weixin/updateUser', userInfo)
}

/**
 * @description 实现本地资源上传
 * @param {*} filePath 要上传的文件资源路径
 * @param {*} name 文件对应的 key
 * @returns Promise
 */
export const reqUploadFile = (filePath, name) => {
  return http.upload<{data: string}>('/fileUpload', filePath, name)
}
