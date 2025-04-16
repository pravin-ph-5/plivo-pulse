// hah om sai ram om bhaskaraya namaha om namaha sivaya 

import axios from "axios"

const instance = axios.create({
  baseURL: "/api", // now uses the proxy
  withCredentials: false
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
