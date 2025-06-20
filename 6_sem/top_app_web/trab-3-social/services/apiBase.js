// CAMADA 2 - API BASE - METODOS BASICOS (POST, GET, ETC) DA API

import api from './api'

export const urls = {
  AUTH: `/auth`,
  USER_CREATE: `/user`,
  LOGIN: `/auth/login`,
}

export const PostFetch = async (url, params) => {
  return api
    .post(url, params)
    .then((data) => data)
    .catch((error) => {
      console.log({
        msg: "Error in PostFetch --> " + url,
        error,
        params
      })
      throw error
    })
}

export const GetFetch = async (url, params) => {
  try {
    const data = await api.get(url, {params})
    return data.data
  } catch (error) {
    throw error
  }
}

export const PutFetch = async (url, params) => {
  try {
    const data = await api.put(url, params)
    return data.data
  } catch (error) {
    throw error
  }
}

export const DeleteFetch = async (url, params) => {
  try {
    const data = await api.delete(url, params)
    return data.data
  } catch (error) {
    throw error
  }
}
