import request from "../utils/request";

export const getChannelAPI = () => {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

export const postCreateArticleAPI = (data: { title: string; content: string; channel_id: string; cover: { type: number; images: string[]; }; }) => {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

export const getArticleListAPI = (params: { status: string; channel_id: string; begin_pubdata: string; end_pubdata: string; page: number; per_page: number; }) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export const delArticleAPI = (id:string) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE'
  })
}

export const getArticleById = (id:string) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'GET'
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const updateArticleById = (data) => {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}