<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="父节点名称:">
						<el-cascader placeholder="请选择父节点" v-model="project1" filterable clearable ref="cascaderAddr" :options="postionArry"
						 :props="defaultProps" style="width: 100%;" @change="postionChange"></el-cascader>
					</el-form-item>
					<el-form-item label="分类名称:">
						<el-input v-model="ruleForm.dicdesc" :disabled="dialogType=='look'?true:false"></el-input>
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
		AddDict,
		GetDict,
		EditDict
	} from '@/api'

	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo', 'BaseType'])
		},
		data: function() {
			return {
				ruleForm: {
					dicdesc: '',
					Remarks: '',
					id: '',
				},
				project1: '',
				postionArry: [],
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

				},
				defaultProps: {
					children: 'children',
					label: 'uname',
					value: 'id',
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
		activated() {

		},
		components: {},
		props: ['dialogType', 'dialogForm', 'dialogTable'],
		mounted: function() {
			console.log(this.dialogForm, this.dialogType);
			this.GetDictInit(); //项目层级化
			if (this.dialogType == 'treeedit' || this.dialogType == 'treelook') {
				this.ruleForm.id = this.dialogForm.id;
				this.ruleForm.dicdesc = this.dialogForm.uname;
				this.project1 = this.dialogForm.id;
				if (this.dialogType == 'look') {
					this.disabled = true;
				}

			}
			//select手动点击lable 获取值
			setInterval(function() {
				document.querySelectorAll(".el-cascader-node__label").forEach(el => {
					el.onclick = function() {
						if (this.previousElementSibling) this.previousElementSibling.click();
					};
				});
			}, 1000);

		},

		methods: {

			postionChange(data) {
				var itemData = this.$refs["cascaderAddr"].getCheckedNodes();
				console.log(itemData) //获得当前节点，
				this.ruleForm.id = itemData[0].value

			},
			GetDictInit() { //项目级层初始化
				GetDict().then((res) => {
						var newData = res;
						console.log(res);
						// var newData=this.setList(res,this.dialogTable);
						this.postionArry = newData;

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
						this.submitLoad = true;

						if (self.dialogType == 'treeedit') {
							var data = this.ruleForm;
							var url = EditDict;
						} else {
							var data = this.ruleForm;
							var url = AddDict;
						}
						url(data).then((res) => {
							this.submitLoad = false;
							this.$message({
								message: '操作成功',
								type: 'success',
								center: true
							})
							self.$emit('showStudes', false);

						}).catch((res) => {
							this.submitLoad = false;
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
		height: 28vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
