import { getStage, setStage } from "@/utils/cookie"

const state = {
    projectNo: getStage()
}

const mutations = {
    SET_PROJECTNO: (state, projectNo) => {
        state.projectNo = projectNo
        setStage(projectNo)
    }
}

// const actions = {
//     // user login
//     login({ commit }, userInfo) {
//         const { user, pwd } = userInfo
//         return new Promise((resolve, reject) => {
//             login(user, pwd)
//                 .then((response) => {
//                     commit('SET_NAME', response[0].o_username)
//                     commit('SET_ROLE', response[0].o_userdesc)
//                     commit('SET_USERID', response[0].o_userno)
//                     resolve()
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         })
//     }
// }

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}