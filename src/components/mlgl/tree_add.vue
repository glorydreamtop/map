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
						<el-input v-model="ruleForm.desc" :disabled="dialogType=='look'?true:false"></el-input>
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
		AddFolder,
		GetFolders,
		EditFolder
	} from '@/api'

	export default {
		name: 'mlgladd',
		computed: {
			...mapGetters(['KeyNo', 'projectNo','BaseType'])
		},
		data: function() {
			return {
				ruleForm: {
					desc: '',
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
					label: 'desc',
					value: 'no',
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
			this.GetFoldersInit(); //项目层级化
			if (this.dialogType == 'treeedit' || this.dialogType == 'treelook') {
				this.ruleForm.id = this.dialogForm.id;
				this.ruleForm.desc = this.dialogForm.desc;
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
			GetFoldersInit() { //项目级层初始化
				GetFolders({ProjectNo:this.projectNo}).then((res) => {
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
							var url = EditFolder;
						} else {
							var data = this.ruleForm;
							var url = AddFolder;
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
