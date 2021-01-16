const state = {
    TypeName: '',//主表类别（电力基础信息、电信基础信息）
	
}

const mutations = {
    SET_TYPENAME: (state, inFor) => {
        state.TypeName = inFor
    },
	
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}
