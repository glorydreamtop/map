<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
					<el-row :gutter="10">
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="姓名:" prop="XM">
								<el-input v-model="ruleForm.XM" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="性别:" prop="XB">
								<el-select v-model="ruleForm.XB" filterable placeholder="请选择性别" :disabled="dialogType=='look'?true:false" clearable>
									<el-option :key="item.ucode" :label="item.uname" :value="item.ucode" v-for="item in optionData.xingbie"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="出生年月:" prop="CSNY">
								<el-date-picker v-model="ruleForm.CSNY" type="date" placeholder="请选择出生年月" :disabled="dialogType=='look'?true:false"
								 value-format="yyyy-MM-dd"> </el-date-picker>
							</el-form-item>
							<el-form-item label="文化程度:" prop="WHCD">
								<el-select v-model="ruleForm.WHCD" filterable placeholder="请选择文化程度" :disabled="dialogType=='look'?true:false" clearable>
									<el-option :key="item.ucode" :label="item.uname" :value="item.ucode" v-for="item in optionData.wenhuachengdu"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="户籍性质:" prop="HKXZ">
								<el-select v-model="ruleForm.HKXZ" filterable placeholder="请选择户籍性质" :disabled="dialogType=='look'?true:false" clearable>
									<el-option :key="item.ucode" :label="item.uname" :value="item.ucode" v-for="item in optionData.hujixingzhi"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="与户主关系:" prop="YHZGX">
								<el-select v-model="ruleForm.YHZGX" filterable placeholder="请选择与户主关系" :disabled="dialogType=='look'?true:false" clearable>
									<el-option :key="item.ucode" :label="item.uname" :value="item.ucode" v-for="item in optionData.huzhuguanxi"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="民族:" prop="MZ">
								<!-- <el-input v-model="ruleForm.MZ" :disabled="dialogType=='look'?true:false"></el-input> -->
								<el-select v-model="ruleForm.MZ" filterable placeholder="请选择民族" :disabled="dialogType=='look'?true:false" clearable>
									<el-option :key="item.ucode" :label="item.uname" :value="item.ucode" v-for="item in optionData.minzu"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="身份证号码:" prop="SFZH">
								<el-input v-model="ruleForm.SFZH" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="从事职业:" prop="CSZY">
								<el-select v-model="ruleForm.CSZY" filterable placeholder="请选择从事职业" :disabled="dialogType=='look'?true:false" clearable>
									<el-option :key="item.ucode" :label="item.uname" :value="item.ucode" v-for="item in optionData.congshizhiye"></el-option>
								</el-select>
								
							</el-form-item>
							<el-form-item label="户口所在地:" prop="HKSZD">
								<el-input v-model="ruleForm.HKSZD" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="备注:" prop="BZ">
								<el-input v-model="ruleForm.BZ" type="textarea" :rows="6" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
						</el-col>
						
					</el-row>
					


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
		AddHousehold_Sub,
		EditHousehold_Sub,
		GetDictItemsByUcode
	} from '@/api';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'huxinxidiaocha_fly_add',
		computed: {
			...mapGetters(['householdId'])
		},
		data: function() {
			return {
				ruleForm: {
					stationName: '',
					
				},
				optionData:{},
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					XM: [{
						required: true,
						message: '请填写姓名',
						trigger: 'blur'
					}, ],
					YHZGX: [{
						required: true,
						message: '请选择与户主关系',
						trigger: 'change'
					}, ],
					XB: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}, ],
					MZ: [{
						required: true,
						message: '请选择民族',
						trigger: 'blur'
					}, ],
					CSNY: [{
						required: true,
						message: '请选择出生年月',
						trigger: 'change'
					}, ],
					WHCD: [{
						required: true,
						message: '请选择文化程度',
						trigger: 'change'
					}, ],
					HKXZ: [{
						required: true,
						message: '请选择户籍性质',
						trigger: 'change'
					}, ],
					HKSZD: [{
						required: true,
						message: '请填写户口所在地',
						trigger: 'blur'
					}, ],
					SFZH: [{
						required: true,
						message: '请填写身份证',
						trigger: 'blur'
					}, ],

				},

			}
		},
		
		components: {},
		created() {
			this.zidianInit("10050001",'huzhuguanxi');//与户主关系
			this.zidianInit("10050002",'xingbie');//性别
			this.zidianInit("10050003",'minzu');//民族
			this.zidianInit("10050004",'wenhuachengdu');//文化程度
			this.zidianInit("10050005",'hujixingzhi');//户籍性质
			this.zidianInit("10050010",'congshizhiye');//从事职业
		},
		props: ['dialogType', 'dialogForm'],
		mounted: function() {
			console.log(this.dialogType)
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.disabled = true;
				this.ruleForm = this.dialogForm;
				console.log(this.ruleForm)
			}
            
			
		},

		methods: {
			zidianInit(ucode,data){
				GetDictItemsByUcode({ucode:ucode,level:1}).then((res) => {
					    this.$set(this.optionData,data,res)
							console.log(this.optionData)
						}).catch((res) => {
							console.log(res)
							
						})
			},
			change_tableType(data) { //选择表类型

			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				self.loading = true;
				this.$refs[formName].validate((valid) => {
					// alert(1);
					var self = this;
					if (valid) {
						if (self.dialogType == 'edit') {
							var url = EditHousehold_Sub;
							var data = {
								id: self.dialogForm.KeyNo,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						} else {
							var url = AddHousehold_Sub;
							var data = {
								TypeName: '人口信息',
								id: self.householdId,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						}
						console.log(data);
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

						self.loading = false;
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
		height: 60vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
