import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  username: '',
  userid: '',
  role: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { user, pwd } = userInfo
    return new Promise((resolve, reject) => {
      login(user, pwd)
        .then((response) => {
          commit('SET_TOKEN', response)
          commit('SET_NAME', name)
          commit('SET_ROLE', role)
          commit('SET_USERID', userid)
          setToken(response)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // get company
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          if (!response) {
            reject('身份认证失败,请重新登录')
          }
          response.roles = ['business']
          const {
            name,
            logo,
            roles,
            last_login_time,
            ship_address,
            phone
          } = response
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_LAST_LOGIN_TIME', last_login_time)
          commit('SET_AVATAR', logo)
          commit('SET_SHIPADDRESS', ship_address)
          commit('SET_PHONE', phone)
          resolve(response)
        })
        .catch((error) => {
          reject({ message: '企业认证未通过', error })
        })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_AVATAR', '')
      removeToken()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
