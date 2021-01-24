const state = {
    town: ''
}

const mutations = {
    SET_TOWN: (state, town) => {
        state.town = town
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}