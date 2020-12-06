const state = {
    KeyNo: '',
	BaseType:'',
}

const mutations = {
    set_KeyNo: (state, inFor) => {
        state.KeyNo = inFor
    },
	set_BaseType: (state, inFor) => {
        state.BaseType = inFor
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}