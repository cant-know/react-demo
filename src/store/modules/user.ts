import {createSlice} from '@reduxjs/toolkit'
import request from '../../utils/request'
import type { FieldType } from '../../pages/login'

const userStore = createSlice({
  name: 'user',
  initialState:{
    token: localStorage.getItem('token') || '',
    userInfo: {}
  },
  reducers:{
    setToken(state,action){
      state.token = action.payload
      localStorage.setItem('token',action.payload)
    },
    setUserInfo(state,action){
      state.userInfo = action.payload
    }
  }
})

export const reqLogin = (loginForm:FieldType) => {
  return async (dispatch: (arg0: { payload: unknown; type: "user/setToken" }) => void) => {
    const res = await request.post('/authorizations',loginForm)
    console.log(res)
    dispatch(setToken(res.data.data.token))
  }
}

export const reqUserInfo = () => {
  return async (dispatch: (arg0: { payload: unknown; type: "user/setUserInfo" }) => void) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data.data))
  }
}
export const {setToken, setUserInfo} = userStore.actions

export default userStore.reducer
