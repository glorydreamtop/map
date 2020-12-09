<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form label-position="top"  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="项目名称:">
						  <el-cascader v-model="project1" filterable clearable  ref="cascaderAddr"  :options="postionArry" :props="defaultProps" style="width: 100%;" @change="postionChange"></el-cascader>
						<!-- <el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input> -->
					</el-form-item>
					<el-form-item label="指标:" >
						<el-input v-model="ruleForm.Target" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="备注:" >
						<el-input type="textarea"  :rows="5" v-model="ruleForm.Remarks" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					
				</el-form>
                <div class="margin-top-l text-center " v-show="dialogType!='look'">
                		<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
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
		GetJBQKDCBItems,AddBaseTablesListAttrs,UpdateBaseTablesListAttrs
	} from '@/api'
	
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo','BaseType'])
		},
		data: function() {
			return {
				project1:'',
				ruleForm: {
					VirtualitemName: '',
					VirtualitemDesc: '',
					Target: '',
					Remarks: '',
				},
				postionArry:[],
				submitLoad: false,
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
			console.log(this.KeyNo,this.dialogForm);
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.ruleForm=this.dialogForm;
				this.project1=this.dialogForm.value;
				if(this.dialogType == 'look'){
					this.disabled = true;
				}
			}
            this.GetJBQKDCBItemsInit();
		},

		methods: {
			
			postionChange(data){
				var itemData=this.$refs["cascaderAddr"].getCheckedNodes();
				this.ruleForm.VirtualitemDesc=itemData[0].label
				this.ruleForm.VirtualitemName=itemData[0].value;
				console.log(itemData)//获得当前节点，
			},
			GetJBQKDCBItemsInit(){//项目级层初始化
				var data = {
					BaseType: this.BaseType,
				};
				GetJBQKDCBItems(data).then((res) => {	  
					var newData=this.setList(res,this.dialogTable);
					this.postionArry=newData;
				})
				.catch((error) => {
					this.postionArry = [];
					console.log(error)
				})
			},
			setList(newData,oldData){
						for(var j in oldData){
							if(oldData[j]&&oldData[j].children&&oldData[j].children.length!=0){	
								this.setList(newData[j].children,oldData[j].children);
							}
							else{
								if(newData[j].SerialNumber==oldData[j].SerialNumber&&oldData[j].ClassName=='singleitem'){
									newData[j].disabled=true;
								}else{
									newData[j].disabled=false;
								}
							}
						}
					return newData;
			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoad=true;
						var data = {
							id: self.KeyNo,
							BaseType: self.BaseType,
							JsonStr:JSON.stringify(self.ruleForm)   
						};
						if (self.dialogType == 'edit') {
							var url = UpdateBaseTablesListAttrs;
						} else {
							var url = AddBaseTablesListAttrs;
						}
						url(data).then((res) => {
							this.submitLoad=false;
							this.$message({
								message: '操作成功',
								type: 'success',
								center: true
							})
							self.$emit('showStudes',false);
							
						}).catch((res) => {
							this.submitLoad=false;
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
