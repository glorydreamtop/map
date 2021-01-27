// import axios from 'axios'
// import store from '@/store'
// import {
// 	GetDictItemsByUcode
// } from '@/api';
// export function codeTable(ucode) {
// 	GetDictItemsByUcode({
// 		ucode: ucode
// 	}).then((res) => {
// 		var list = []; //结果lsit
// 		treeToList(res,list);
		
// 		store.commit("info/SET_UCODEVALUE", list);
// 		console.log(store);
// 		// return list;
// 	}).catch((error) => {
// 		console.log(error)
// 	})
// }
// export function treeToList(tree,list) {
	
// 	for (var i in tree) {
// 		var node = tree[i];
// 		if (node.children.length !== 0) { //遍历树的第一层,只有一个根结点
// 			toListDF(node.children, list, node.id); //遍历子树,并加入到list中.
// 		}
// 	}
// 	// console.log(list, 'ucode列表');
// 	// return list;
// }
// export function toListDF(tree, list, parentId) {
// 	for (var i in tree) { //遍历最上层
// 		//将当前树放入list中
// 		var node = tree[i];
// 		list.push(node);
// 		//如果有子结点,再遍历子结点
// 		if (node.children && node.children.length !== 0) {
// 			toListDF(node.children, list, node.id) //递归
// 		}
// 	}
// }
