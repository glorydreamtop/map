const state = {
    KeyNo: ''
}

const mutations = {
    set_KeyNo: (state, inFor) => {
        state.KeyNo = inFor
		// console.log(inFor,state.KeyNo)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}