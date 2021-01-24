import { login } from '@/api'
import { getToken, setToken } from '@/utils/cookie'

const state = {
    token: getToken(),
    username: '',
    userid: '',
    role: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        setToken(token)
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
                    console.log(response);
                    commit('SET_NAME', response[0].o_username)
                    commit('SET_ROLE', response[0].o_userdesc)
                    commit('SET_USERID', response[0].o_userno)
                    resolve()
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLE', '')
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