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

export default {
    namespaced: true,
    state,
    mutations,
    // actions
}