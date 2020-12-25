const state = {
    parcelId: '',//地块ID
	Locationno:'',//区域id 
}

const mutations = {
    SET_PARCELID: (state, inFor) => {
        state.parcelId = inFor
    },
	SET_LOCATIONNO: (state, inFor) => {
        state.Locationno = inFor
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}