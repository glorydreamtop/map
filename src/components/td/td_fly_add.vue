<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-form-item label="地块名称:">
						<el-input v-model="ruleForm.UNAME" :disabled="dialogType=='look'?true:false" ></el-input>
					</el-form-item>
					<el-form-item label="土地性质:" prop="Natureofland">
						<el-select v-model="ruleForm.Natureofland" filterable placeholder="请选择土地性质" >
							<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
							<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
							<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="绘制数据:" prop="Polygon">
						<el-input v-model="ruleForm.Polygon" :disabled="dialogType=='look'?true:false" ></el-input>
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
		AddHousehold,
		EditHousehold
	} from '@/api';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'huxinxidiaocha_fly_add',
		computed: {
			...mapGetters(['projectNo', 'parcelId'])
		},
		data: function() {
			return {
				ruleForm: {
					stationName: '',
				},
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					stationName: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],

				},

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
			console.log(this.dialogForm)
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.disabled = true;
				this.ruleForm = JSON.parse(JSON.stringify(this.dialogForm));
			}

		},

		methods: {
			change_tableType(data) { //选择表类型

			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				// self.loading = true;
				this.$refs[formName].validate((valid) => {
					// alert(1);
					var self = this;
					if (valid) {

						if (self.dialogType == 'edit') {
							var url = EditHousehold;
							var data = {
								id: self.dialogForm.KeyNo,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						} else {
							var url = AddHousehold;
							var data = {
								ProjectNo: self.projectNo,
								id: self.parcelId,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						}

						url(data).then((res) => {
							self.loading = false;
							self.$emit('showStudes', false);
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true,

							});
						}).catch((res) => {
							console.log(res)
							self.loading = false;
							this.$message({
								message: '操作失败，请确定后提交',
								type: 'error',
								center: true
							})
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
		height: 450px;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
