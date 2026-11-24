import { defineStore } from 'pinia'
import { reactive } from 'vue'
import api from '../api'

export const useGlobalStore = defineStore('global', () => {
  const user = reactive({
    id: null,
    token: localStorage.getItem('token'),
    email: null,
    username: null,
    isAdmin: false,
  })

  function setToken(token) {
    localStorage.setItem('token', token)
    user.token = token
  }

  async function getUserDetails(token) {
    if (!token) {
      user.id = null
      user.token = null
      user.email = null
      user.username = null
      user.isAdmin = false
      return
    }

    let response = await api.get('/users/details')

    user.id = response.data._id
    user.token = token
    user.email = response.data.email
    user.username = response.data.username
    user.isAdmin = response.data.isAdmin
  }

  function clearUser() {
    localStorage.removeItem('token')
    user.id = null
    user.token = null
    user.email = null
    user.username = null
    user.isAdmin = false
  }

  return { user, setToken, getUserDetails, clearUser }
})
