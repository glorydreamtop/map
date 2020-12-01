const getters = {
    token: (state) => state.user.token,
    username: (state) => state.user.username,
    role: (state) => state.user.role,
    projectNo: (state) => state.info.projectNo
}
export default getters