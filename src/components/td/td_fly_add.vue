<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-form-item label="地块名称:">
						<el-input v-model="ruleForm.UNAME" :disabled="dialogType=='look'?true:false" ></el-input>
					</el-form-item>
					<el-form-item label="土地性质:" prop="landType">
						<el-cascader  v-model="ruleForm.landType" placeholder="开始定位" :options="landTypeData" ref="sysCascader" @change="handleChange($event)" :props="prop"
						 filterable style="width: 100%;"></el-cascader>
					</el-form-item>
					<el-form-item label="绘制数据:" prop="Polygon">
						<el-input v-model="ruleForm.Polygon" :disabled="dialogType=='look'?true:false" ></el-input>
					</el-form-item>
				</el-form>
				<div class="margin-top-l text-center " v-show="dialogType!='look'">
					<el-button class="button-l" type="primary" @click="submitForm('ruleForm')" :loading="loading">{{loading===false?'提交':'提交中'}}</el-button>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		AddHousehold,
		EditHousehold,
		GetDictItemsByUcode
	} from '@/api';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'huxinxidiaocha_fly_add',
		computed: {
			...mapGetters(['Locationno', 'parcelId'])
		},
		data: function() {
			return {
				ruleForm: {
					stationName: '',
				},
				landTypeData:[],
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					landType: [{
						required: true,
						message: '请选择土地性质',
						trigger: 'change'
					}, ],

				},
				prop: {
					checkStrictly: true,
					label: 'uname',
					value: 'ucode',
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
			this.landTypeInit('1004',1);//土地地块分类
			setInterval(function() {
				document.querySelectorAll(".el-cascader-node__label").forEach(el => {
					el.onclick = function() {
						if (this.previousElementSibling) this.previousElementSibling.click();
					};
				});
			}, 1000);

		},

		methods: {
			handleChange(event) {
				let pathvalue = this.$refs.sysCascader.getCheckedNodes()[0];
				console.log(pathvalue);
				if(pathvalue.level==1){
					this.$set(this.ruleForm,'Natureofland',pathvalue.value);
				}
				if(pathvalue.level==2){
					this.$set(this.ruleForm,'Classify1',pathvalue.value);
				}
				if(pathvalue.level==3){
					this.$set(this.ruleForm,'Classify2',pathvalue.value);
				}
				if(pathvalue.level==4){
					this.$set(this.ruleForm,'Classify3',pathvalue.value);
				}
                console.log(this.ruleForm)
			},
			landTypeInit(ucode){
				
				GetDictItemsByUcode({
					ucode: ucode,
					level:0
				}).then((res) => {
					this.landTypeData=res;
					console.log(res)
					
				
				}).catch((res) => {
					console.log(res);
				})
				
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
								Locationno: self.Locationno,
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
		height: 450px;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
