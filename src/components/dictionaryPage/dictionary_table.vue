<template>
	<el-dialog :visible.sync="visible" :close-on-press-escape="false" width="70vw" v-loading="loadingtable" title="字典设置"
	 custom-class="dictionary_dialog" @close="$emit('update:showDialog', false)" center>
		<el-row :gutter="20">
			<el-col :xs="8" :sm="8" :md="7" :lg="6" :xl="5">
				<div class="treeMain">
					<div class="header_table_title">
						<el-button size="mini" @click="addClick('tree')" icon="al-icon-tianjia"></el-button>
						<el-button title="修改" @click="editClick('tree')" size="mini" icon="al-icon-xiugai" plain></el-button>
						<el-button title="删除" @click="delClick('tree')" size="mini" icon="al-icon-shanchu" plain></el-button>
					</div>
					<div style="margin-top: 15px;">
						<el-input placeholder="请输入内容" v-model="lookFor" class="input-with-select" clearable @keyup.enter.native="lookFor_tree">
							<el-button slot="append" icon="el-icon-search" @click="lookFor_tree"></el-button>
						</el-input>
					</div>
					<div class="body_tree_mian">
						<el-tree :data="treeData" node-key='id'  ref="tree" :filter-node-method="filterNode" :props="defaultProps" highlight-current	
						 @node-click="handleNodeClick" :default-expanded-keys="treeExpandData"></el-tree>
					</div>
				</div>
			</el-col>
			<el-col :xs="16" :sm="16" :md="17" :lg="18" :xl="19">
				<div class="tableMain">
					<div class="header_table_title">
						<el-button size="mini" @click="addClick('table')" icon="al-icon-tianjia"></el-button>
						<el-button title="修改" @click="editClick('table')" size="mini" icon="al-icon-xiugai" plain></el-button>
						<el-button title="删除" @click="delClick('table')" size="mini" icon="al-icon-shanchu" plain></el-button>
					</div>
					<div class="body_table_mian">
						<el-table v-loading="tableLoad" element-loading-text="客官请稍后" element-loading-spinner="el-icon-loading" class="fixTable49"
						 element-loading-background="#022333" :data="tableData" row-key="id" :tree-props="{ children: 'children' }"
						 highlight-current-row border style="width: 100%" height="55vh" @row-click="rowClick">
							<el-table-column prop="uname" label="项目名称" align="left"></el-table-column>
							<el-table-column prop="ucode" label="编码" align="center" width="130"></el-table-column>
							<el-table-column prop="unit" label="单位" align="center " width="100"></el-table-column>
							<el-table-column prop="remarks" label="描述" align="center"></el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
			<div>
				<el-dialog :title="dialogTitle" :append-to-body="true" @close="closeDialog" :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " center :custom-class="flyType + '_add_dialog'">
					<treeAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm_tree" v-if="showFlag && flyType == 'tree'"></treeAdd>
					<tableAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm_table" :dialog-form-tree="dialogForm_tree" v-if="showFlag && flyType == 'table'"></tableAdd>
				</el-dialog>
			</div>
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
		GetDictItems
	} from '@/api';
	import treeAdd from '@/components/dictionaryPage/dictionary_tree_add';
	import tableAdd from '@/components/dictionaryPage/dictionary_table_add';
	export default {
		name: 'jbqlTable_home',
		props: {},
		components: {
			treeAdd,
			tableAdd
		},
		computed: {
			...mapGetters(['projectNo', 'BaseType'])
		},
		data() {
			return {
				lookFor: '',
				treeExpandData:[], //自己定义的用于接收tree树id的数组
				tableData: [],
				treeData: [],
				dialogTitle: '', //弹出框标题
				dialogForm_tree: '', //弹出框表单
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
					label: 'uname'
				},
				treeActive:'',
			};
		},
		created() {},
		mounted() {
			// this.tableInit(); //表格初始化
			this.$nextTick(function(){
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
				let isPass = node.data && node.data.uname && node.data.uname.indexOf(value) !== -1
				isPass ? _array.push(isPass) : ''
				this.index++
				// console.log(this.index)
				if (!isPass && node.level != 1 && node.parent) {
					this.getReturnNode(node.parent, _array, value)
				}
			},
			treeInit() {
				var self=this;
				GetDict().then((res) => {
						console.log(res)
						// this.tableLoad=false;
						self.treeData = res;
						
						self.$nextTick(function() {
							// console.log(this.dialogForm_tree)
						  self.$refs.tree.setCurrentKey(self.dialogForm_tree.id?self.dialogForm_tree.id:res[0].id);
						  self.treeExpandData=[self.dialogForm_tree.id?self.dialogForm_tree.id:res[0].id];
						})
					})
					.catch((error) => {
						self.tableData = [];
						self.tableLoad = false;
						console.log(error)
					})
			},
			
			tableInit() {
				var data = {
					id: this.dialogForm_tree.id,
				};
				this.tableLoad = true;
				GetDictItems(data)
					.then(res => {
						console.log(res,'表格');
						this.tableLoad = false;
						this.tableData = res;
						// this.total = res.total;
					})
					.catch(error => {
						this.tableData = [];
						this.tableLoad = false;
						console.log(error);
					});
			},
			handleNodeClick(data) {
				//点击树形
				console.log(data.ucode,'点击树形')
				this.dialogForm_tree = data;
				this.treeActive=data;
				this.tableInit(); //表格初始化
			},
			rowClick(row) {
				//单击表格一行
				// console.log(row)
				this.dialogForm_table = row;
			},
			handleSizeChange(val) {
				//每页#条
				this.formeData.PageSize = val;
				this.tableInit();
			},
			handleCurrentChange(val) {
				//当前第几页
				this.formeData.CurrentPage = val;
				this.tableInit();
			},
			lookClick(type) {
				//查看
				this.flyType = type;
				this.dialogForm = '';
				this.dialogTitle = '查看' + (type == 'tree' ? '项目树' : '数据项');
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
							DelDict({
									id: self[`dialogForm_${type}`].id
								})
								.then(res => {
									self.$message({
										message: '操作成功',
										type: 'success',
										center: true
									});
                                    self[`dialogForm_${type}`]='';
									self.treeInit();
									self.tableInit();
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
				console.log(this[`dialogForm_${type}`])
				if (this[`dialogForm_${type}`]) {
					this.flyType = type;
					this.dialogTitle = '修改' + (type == 'tree' ? '项目树' : '数据项');
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
				this.flyType = type;
				this[`dialogForm_${type}`] = '';
				this.dialogTitle = '添加' + (type == 'tree' ? '项目树' : '数据项');
				this.dialogType = type + 'add';
				this.showFlag = true;
			},
			closeDialog() {
				//关闭弹出框
				this.treeInit();
				this.tableInit();
			},
			showStudescode(data) {
				//监听弹出框是关还是闭
				console.log(data,'监听是关闭还是打开')
				this.showFlag = data;
				this.tableInit();
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
