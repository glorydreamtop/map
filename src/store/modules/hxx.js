const state = {
    parcelId: '',//地块ID
	Locationno:'',//区域id 
	householdId:'',//户信息id
}

const mutations = {
    SET_PARCELID: (state, inFor) => {
        state.parcelId = inFor
    },
	SET_LOCATIONNO: (state, inFor) => {
        state.Locationno = inFor
    },
	SET_HOUSEHOLDID: (state, inFor) => {
        state.householdId = inFor
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}