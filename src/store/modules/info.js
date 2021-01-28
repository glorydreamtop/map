import { getStage, setStage } from "@/utils/cookie"
const state = {
	projectNo: parseInt(getStage())
}

const mutations = {
	SET_PROJECTNO: (state, projectNo) => {
		state.projectNo = projectNo
		setStage(projectNo)
	}
}
const actions = {
	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			console.log(resolve);
			commit('SET_UCODEVALUE', [])
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