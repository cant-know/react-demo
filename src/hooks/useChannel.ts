import { useState, useEffect } from "react"
import { getChannelAPI } from "../apis/article"

export const useChannel = () => {
  const [channelList, setChannelList] = useState([{ id: 0, name: '请选择频道' }])

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.data.channels)
    }
    getChannelList()
  },[])

  return channelList
}