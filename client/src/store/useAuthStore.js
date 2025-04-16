// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,

  setAuth: ({ user, token }) => {
    localStorage.setItem('token', token)
    set({ user, token })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  }
}))

export default useAuthStore
