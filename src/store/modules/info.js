import { getStage, setStage } from "@/utils/cookie"
import Vue from 'vue'
import {
	GetDictItemsByUcode
} from '@/api';
const state = {
    projectNo: parseInt(getStage()),
	ucodeValue:[],
}

const mutations = {
    SET_PROJECTNO: (state, projectNo) => {
        state.projectNo = projectNo
        setStage(projectNo)
    },
	SET_UCODEVALUE: (state, inFor) => {
		console.log(state.ucodeValue,'变化')
	    return state.ucodeValue
	},
}
const actions = {
    ucodeValue_method({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            GetDictItemsByUcode(userInfo)
                .then((response) => {
                  
					var list = []; //结果lsit
					treeToList(response,list);
					// console.log(list,'code数据')
					// commit("SET_UCODEVALUE", list);
					localStorage.setItem('ucodeValue',JSON.stringify(list) )
					Vue.set(state,'ucodeValue',list)
					resolve()
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise((resolve) => {
			console.log(resolve);
            commit('SET_UCODEVALUE', [])
            resolve()
        })
    }
}
export function treeToList(tree,list) {
	
	for (var i in tree) {
		var node = tree[i];
		if (node.children.length !== 0) { //遍历树的第一层,只有一个根结点
			toListDF(node.children, list, node.id); //遍历子树,并加入到list中.
		}
	}
}
export function toListDF(tree, list, parentId) {
	for (var i in tree) { //遍历最上层
		//将当前树放入list中
		var node = tree[i];
		list.push(node);
		//如果有子结点,再遍历子结点
		if (node.children && node.children.length !== 0) {
			toListDF(node.children, list, node.id) //递归
		}
	}
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}