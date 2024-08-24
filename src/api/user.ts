import http from '@/utils/http'

/**
 * @description 进行登录操作
 * @param {*} code 临时登录凭证
 * @returns Promise
 */
export const reqLogin = (code) => {
  return http.get(`/weixin/wxLogin/${code}`)
}

/**
 * @description 获取用户信息
 * @returns Promise
 */
export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}

/**
 * @description 更新用户信息
 * @param {*} userInfo 最新的头像和昵称
 * @returns Promise
 */
export const reqUpdateUserInfo = (userInfo) => {
  return http.post('/weixin/updateUser', userInfo)
}
