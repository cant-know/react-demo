import { FieldType } from "../pages/login"
import request from "../utils/request"

export const loginAPI = (formData: FieldType) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData
  })
}

export const getUserInfoAPI = () => {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}