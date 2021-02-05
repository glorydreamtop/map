<template>
	<el-dialog :visible.sync="visible" :close-on-press-escape="false" v-loading="loadingtable" title="地块设置" custom-class="landSet_dialog"
	 @close="$emit('update:showDialog', false)" center>
		<el-row :gutter="20">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="treeMain">
					<div class="header_table_title">
						<el-button size="mini" @click="addClick('tree')" icon="al-icon-tianjia"></el-button>
						<el-button title="修改" @click="editClick('tree')" size="mini" icon="al-icon-xiugai"></el-button>
						<el-button title="删除" @click="delClick('tree')" size="mini" icon="al-icon-shanchu"></el-button>
					</div>
					<div style="margin-top: 15px;">
						<el-input placeholder="请输入内容" v-model="lookFor" class="input-with-select" clearable @keyup.enter.native="lookFor_tree">
							<el-button slot="append" icon="el-icon-search" @click="lookFor_tree"></el-button>
						</el-input>
					</div>
					<div class="body_tree_mian">
						<el-tree :data="treeData" node-key='id' ref="tree" :filter-node-method="filterNode" :props="defaultProps"
						 highlight-current @node-click="handleNodeClick" :default-expanded-keys="treeExpandData" default-expand-all></el-tree>
					</div>
				</div>
			</el-col>

			<el-dialog :title="dialogTitle" :append-to-body="true" @close="closeDialog" :visible.sync="showFlag" v-model="showFlag"
			 class="newStyleDialog " center custom-class="landSet_dialog">
				<treeAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm_tree" v-if="showFlag"></treeAdd>
			</el-dialog>
		</el-row>
	</el-dialog>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		GetDict,
		DelDict,
		GetDictItems,
		GetEntitiesTree,
		DelLocation
	} from '@/api';
	import treeAdd from '@/components/landSetPage/landSet_tree_add';
	// import tableAdd from '@/components/dictionaryPage/dictionary_table_add';
	export default {
		name: 'jbqlTable_home',
		props: {},
		components: {
			treeAdd,
			// tableAdd
		},
		computed: {
			...mapGetters(['projectNo', 'BaseType'])
		},
		data() {
			return {
				lookFor: '',
				treeExpandData: [], //自己定义的用于接收tree树id的数组
				tableData: [],
				treeData: [],
				dialogTitle: '', //弹出框标题
				dialogForm_tree: {}, //弹出框表单
				dialogForm_table: '', //弹出框表单
				showFlag: false, //弹出框显隐状态
				visible: true,
				dialogType: '', //弹出框操作类型
				flyType: '',
				total: 0,
				formeData: {
					CurrentPage: 1,
					PageSize: 10
				},
				loadingtable: false,
				tableLoad: false,
				defaultProps: {
					children: 'children',
					label: 'desc',
					value: "no"
				},
				treeActive: '',
			};
		},
		created() {},
		mounted() {
			// this.tableInit(); //表格初始化
			this.$nextTick(function() {
				this.treeInit(); //树形初始化
			})

		},
		methods: {
			lookFor_tree() {
				this.$refs.tree.filter(this.lookFor);
			},
			filterNode(value, data, node) { //树形过滤筛选
				if (!value) {
					return true
				}
				let level = node.level
				let _array = [] //这里使用数组存储 只是为了存储值。
				this.getReturnNode(node, _array, value)
				let result = false
				_array.forEach(item => {
					result = result || item
				})
				return result
			},
			getReturnNode(node, _array, value) {
				let isPass = node.data && node.data.desc && node.data.desc.indexOf(value) !== -1
				isPass ? _array.push(isPass) : ''
				this.index++
				// console.log(this.index)
				if (!isPass && node.level != 1 && node.parent) {
					this.getReturnNode(node.parent, _array, value)
				}
			},
			treeInit() {
				var self = this;
				GetEntitiesTree({
						ProjectNo: this.projectNo
					}).then((res) => {
						console.log(res)
						// this.tableLoad=false;
						self.treeData = res;

						self.$nextTick(function() {
							// console.log(this.dialogForm_tree)
							self.$refs.tree.setCurrentKey(self.dialogForm_tree.id ? self.dialogForm_tree.id : res[0].id);
							self.treeExpandData = [self.dialogForm_tree.id ? self.dialogForm_tree.id : res[0].id];
						})
					})
					.catch((error) => {
						self.tableData = [];
						self.tableLoad = false;
						console.log(error)
					})
			},
			handleNodeClick(data, node) {
				//点击树形
				data.level = node.level;
				this.dialogForm_tree = data;
				console.log(data, node, '点击树形')
				this.treeActive = data;
			},
			lookClick(type) {
				//查看
				this.flyType = type;
				this.dialogForm = '';
				this.dialogTitle = '查看';
				this.dialogType = type + 'look';
				this.showFlag = true;
			},
			delClick(type) {

				if (this[`dialogForm_${type}`]) {
					console.log(this[`dialogForm_${type}`])
					var self = this;
					self.$confirm('此操作将永久删除, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							center: true,
							type: 'warning'
						})
						.then(() => {
							// if(this[`dialogForm_${type}`].level==6){
							// 	var url=DelLocation;
							// }
							DelLocation({
									id: self[`dialogForm_${type}`].no
								})
								.then(res => {
									self.$message({
										message: '操作成功',
										type: 'success',
										center: true
									});
									self[`dialogForm_${type}`] = '';
									self.treeInit();
								})
								.catch(res => {
									console.log(res);
								});
						})
						.catch(res => {
							console.log(res)
						});
				} else {
					this.$message({
						message: '请选择要删除的节点',
						type: 'error',
						center: true
					})
				}



			},
			editClick(type) {
				if (this.dialogForm_tree.level) {
					if (this.dialogForm_tree.level < 6) {
						this.$message({
							message: '此节点不能在修改',
							type: 'error',
							center: true
						})
						return;
					}
					this.flyType = type;
					this.dialogTitle = '修改';
					this.dialogType = type + 'edit';
					this.showFlag = true;
				} else {
					this.$message({
						message: '请选择要编辑的节点',
						type: 'error',
						center: true
					})
				}
				//修改

			},
			addClick(type) {
				//添加
				if (this.dialogForm_tree.level) {
					if (this.dialogForm_tree.level == 6) {
						this.$message({
							message: '此节点不能在添加',
							type: 'error',
							center: true
						})
						return;
					}
					if(this.dialogForm_tree.level ==1){
						var index=this.dialogForm_tree.name.lastIndexOf("\_");
						this.dialogForm_tree.name1=this.dialogForm_tree.name;
						this.dialogForm_tree.name=this.dialogForm_tree.name.substring(index+1,this.dialogForm_tree.name.length);
						// this.$set(this.dialogForm_tree, 'name', '100000000000');
						
					}
					// if (!this.dialogForm_tree.name) {
					// 	this.$set(this.dialogForm_tree, 'name', '100000000000');
					// 	this.$set(this.dialogForm_tree, 'level', 0)
					// }
					console.log(this.dialogForm_tree,123)
					this.flyType = type;
					this.dialogTitle = '添加';
					this.dialogType = type + 'add';
					this.showFlag = true;
				} else {
					this.$message({
						message: '请选择要添加的节点',
						type: 'error',
						center: true
					})
				}
			},
			closeDialog() {
				//关闭弹出框
				this.treeInit();
			},
			showStudescode(data) {
				//监听弹出框是关还是闭
				console.log(data, '监听是关闭还是打开')
				this.showFlag = data;
				this.treeInit();
			}
		}
	};
</script>

<style scoped="scoped">
	.tableMain {
		width: 100%;
		/* height: 50vh; */
	}

	.body_tree_mian {
		margin-top: 1vh;
		/* border: 1px solid; */
		height: 50vh;
		overflow-y: auto;
		overflow-x: auto;
	}

	.treeMain,
	.tableMain {
		border: 1px solid;
		padding: 1vh 1vw 0vh;
		height: 62vh;
		overflow-y: auto;

	}

	.body_table_mian {
		margin-top: 1vh;
	}
</style>
