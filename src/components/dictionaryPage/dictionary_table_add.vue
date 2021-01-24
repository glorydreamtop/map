<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form label-position="top"  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="父节点名称:" v-if="dialogType=='tableadd'">
						  <el-cascader placeholder="请选择父节点" v-model="project1" filterable clearable  ref="cascaderAddr"  :options="postionArry" :props="defaultProps" style="width: 100%;" @change="postionChange"></el-cascader>
						<!-- <el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input> -->
					</el-form-item>
					<el-form-item label="子节点名称:" >
						<el-input v-model="ruleForm.uname" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="单位:" >
						<el-input v-model="ruleForm.unit" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					
					<el-form-item label="备注:" >
						<el-input type="textarea"  :rows="5" v-model="ruleForm.remarks" :disabled="dialogType=='look'?true:false"></el-input>
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
	import { GetDict,AddDictItem,EditDictItem,GetDictItemsByUcode} from '@/api'
	
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo','BaseType'])
		},
		data: function() {
			return {
				ruleForm: {
                    id:'',
					uname: '',
					unit: '',
					remarks: '',
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
				  label: 'uname',
				  value:'id',
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
		created() {
			
		},
		components: {},
		props: ['dialogType', 'dialogForm','dialogTable','dialogFormTree'],
		mounted: function() {
            console.log(this.dialogForm,this.dialogType,this.dialogFormTree,'kan');
			if (this.dialogType == 'tableedit' || this.dialogType == 'tablelook') {	
				this.ruleForm=this.dialogForm;		
				if(this.dialogType == 'tablelook'){
					this.disabled = true;
				}	
			}else{
				 // console.log(this.dialogFormTree,'add');
				this.project1=this.dialogFormTree.id;
				this.ruleForm.id=this.dialogFormTree.id;
			}
			this.GetDictInit();//项目层级化
            
		},

		methods: {
			
			postionChange(data){
				console.log(data)
				var itemData=this.$refs["cascaderAddr"].getCheckedNodes();
				this.ruleForm.id=itemData[0].value
				console.log(itemData)//获得当前节点，
			},
			GetDictInit(){//项目级层初始化
			// console.log(this.dialogForm.ucode)
				var data = {
					ucode: this.dialogFormTree.ucode,
					level:0
				};
				GetDictItemsByUcode(data).then((res) => {	
					console.log(res,'qingqiu');
					var newData=res;
					// var newData=this.setList(res,this.dialogTable);
					this.postionArry=newData;
					
				})
				.catch((error) => {
					this.postionArry = [];
					console.log(error)
				})
			},
			
			submitForm(formName) { //表单提交按钮
				var self = this;
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoad=true;
						if (self.dialogType == 'tableedit') {
							var data = {
								id: self.ruleForm.id,
								JsonStr:JSON.stringify(self.ruleForm)   
							};
							var url=EditDictItem;
						} else {
							var data = {
								id:self.ruleForm.id,
								JsonStr:JSON.stringify(self.ruleForm)   
							};
							var url=AddDictItem;
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
