<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form label-position="top"  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="项目:">
						  <el-cascader filterable clearable  ref="cascaderAddr"  :options="postionArry" :props="defaultProps" style="width: 100%;" @change="postionChange"></el-cascader>
						<!-- <el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input> -->
					</el-form-item>
					<el-form-item label="单位:" >
						<el-input v-model="ruleForm.Unit" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="数量:" >
						<el-input v-model="ruleForm.AttrNum" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="备注:" >
						<el-input type="textarea" v-model="ruleForm.Remarks" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					
				</el-form>
                <div class="margin-top-l text-center " v-show="dialogType!='look'">
                		<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="loading">{{loading===false?'提交':'提交中'}}</el-button>
                </div>
			</div>
			
		</div>
	
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		GetJBQKDCBItems,AddBaseTablesListAttrs
	} from '@/api'
	
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo'])
		},
		data: function() {
			return {
				ruleForm: {
					VirtualitemName: '',
					VirtualitemDesc: '',
					Unit: '',
					AttrNum: '',
					Remarks: '',
				},
				postionArry:[],
				BaseType: 'NONGCUN',
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					stationName: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],
					
				},
				defaultProps: {
				  children: 'children',
				  label: 'label',
				  checkStrictly: true
				}

			}
		},
		dialogType: {
			handler: function(val, oldval) {
				this.dialogType = val;
				this.init();
			},
			deep: true //
		},
		components: {},
		props: ['dialogType', 'dialogForm'],
		mounted: function() {
			console.log(this.KeyNo);
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.disabled = true;
			}
            this.GetJBQKDCBItemsInit();
		},

		methods: {
			postionChange(data){
				var itemData=this.$refs["cascaderAddr"].getCheckedNodes();
				this.ruleForm.VirtualitemName=itemData[0].label
				this.ruleForm.VirtualitemDesc=itemData[0].value;
				console.log(itemData)//获得当前节点，
			},
			GetJBQKDCBItemsInit(){//项目级层初始化
				var data = {
					BaseType: this.BaseType,
				};
				GetJBQKDCBItems(data).then((res) => {
					this.postionArry=res;
						console.log(res)
				
						// this.tableData = res.list;
						// this.total = res.total;
					})
					.catch((error) => {
						this.postionArry = [];
						console.log(error)
					})
			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				// self.loading = true;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var data = {
							id: self.KeyNo,
							BaseType: self.BaseType,
							JsonStr:JSON.stringify(self.ruleForm)   
						};
						// if (self.dialogType == 'edit') {
						// 	var url = exchStationEdit;
						// } else {
						// 	var url = AddBaseTablesListAttrs;
						// }
						console.log(self.ruleForm)
						AddBaseTablesListAttrs(data).then((res) => {
							console.log(res, data);
						}).catch((res) => {
							console.log(res)
							// self.loading = false;
							// this.$message({
							// 	message: '操作失败，请确定后提交',
							// 	type: 'error',
							// 	center: true
							// })
						})
					} else {

						// self.loading = false;
						return false;
					}
				});
				//
			},

		}
	}
</script>
<style scoped="scoped">
	.reyuan_form {
		height: 65vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}

	
</style>
