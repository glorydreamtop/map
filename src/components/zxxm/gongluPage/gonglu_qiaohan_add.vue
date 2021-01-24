<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-form-item label="名称:" >
						<el-input v-model="ruleForm.MC" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					
					<el-form-item label="等级:" >
						<el-input v-model="ruleForm.DJ" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="长度:" >
						<el-input v-model="ruleForm.CD" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="跨径:" >
						<el-input v-model="ruleForm.KJ" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="宽度:" >
						<el-input v-model="ruleForm.KD" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="荷载标准:" >
						<el-input v-model="ruleForm.ZHBZ" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="结构:" >
						<el-input v-model="ruleForm.JG" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="桥面高程:" >
						<el-input v-model="ruleForm.QMGC" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="结构高度:" >
						<el-input v-model="ruleForm.JGGD" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="通航等级:" >
						<el-input v-model="ruleForm.THDJ" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					
				</el-form>
				<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-form-item label="防洪标准:" >
						<el-input type="textarea" class="input-560" :rows="3" v-model="ruleForm.FHBZ" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="其他:" >
						<el-input type="textarea" class="input-560" :rows="3" v-model="ruleForm.QT" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="备注:" >
						<el-input type="textarea" class="input-560" :rows="3" v-model="ruleForm.Remarks" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
			    </el-form>
                <div class="margin-top-l text-center " v-show="dialogType!='look'">
                		<el-button class="button-l" type="primary" @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
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
				ruleForm: {
					Remarks: '',
				},
				project1:'',
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
		activated() {
			
		},
		components: {},
		props: ['dialogType', 'dialogForm','dialogTable'],
		mounted: function() {
			this.GetJBQKDCBItemsInit();//项目层级化
			console.log(this.dialogForm);
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.ruleForm=this.dialogForm;
				this.project1=this.dialogForm.value;
				if(this.dialogType == 'look'){
					this.disabled = true;
				}
				
			}
            
		},

		methods: {
			
			postionChange(data){
				console.log(data)
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
					// var newData=res;
					var newData=this.setList(res,this.dialogTable);
					this.postionArry=newData;
					
				})
				.catch((error) => {
					this.postionArry = [];
					console.log(error)
				})
			},
			setList(newData,oldData){
						for(var i in newData){
							for(var j in oldData){
								if(oldData[j]){
									if(oldData[j]&&oldData[j].children&&oldData[j].children.length!=0){
										this.setList(newData[i].children,oldData[j].children);
									}
									else{
										if(newData[i].label==oldData[j].label&&oldData[j].ClassName=='singleitem'){
											console.log(newData[i].label,oldData[j].label,'相同')
											newData[i].disabled=true;
										}
									}
								}
							}
							
							
						}
						 console.log(newData)
					return newData;
				 
			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoad=true;
						
						if (self.dialogType == 'edit') {
							var data = {
								id: self.dialogForm.KeyNo,
								JsonStr:JSON.stringify(self.ruleForm)   
							};
							var url = UpdateBaseTablesListAttrs;
						} else {
							var data = {
								id: self.KeyNo,
								BaseType: self.BaseType,
								JsonStr:JSON.stringify(self.ruleForm)   
							};
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
		height:55vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}

	
</style>
