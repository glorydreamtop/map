<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="附属物名称:" prop="FWWMC">
								<el-input v-model="ruleForm.FWWMC" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="定额名称:" prop="FSWDEDM">
								<el-select v-model="ruleForm.FSWDEDM" @change="change_DEDM" filterable placeholder="请选择定额名称" :disabled="dialogType=='look'?true:false">
									<el-option :key="item.KeyNo" :label="item.msg" :value="item.KeyNo" v-for="item in dingeData">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="规格:" prop="FSWGG">
								<el-input v-model="ruleForm.FSWGG" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="数量:" prop="FSWSL">
								<el-input-number v-model="ruleForm.FSWSL" :min="0" :disabled="dialogType=='look'?true:false"></el-input-number>
							</el-form-item>
							<el-form-item label="定额单价:" prop="DEDJ">
								<el-input v-model="ruleForm.DEDJ" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="结构类型:" prop="JGLX_DESC">
								<el-select v-model="ruleForm.JGLX_DESC" @change="change_type" filterable placeholder="请选择结构类型" :disabled="dialogType=='look'?true:false">
									<el-option :key="item.o_virtualitemno" :label="item.o_virtualitemdesc" :value="item.o_virtualitemdesc" v-for="item in typeData">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="单位:" prop="DW">
								<el-input v-model="ruleForm.DW" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="丈量尺寸(m):" prop="ZLCC">
								<el-input v-model="ruleForm.ZLCC" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="结构材料:" prop="FSWJGCL">
								<el-select v-model="ruleForm.FSWJGCL" filterable placeholder="请选择结构材料" :disabled="dialogType=='look'?true:false" clearable>
									<el-option :key="item.ucode" :label="item.uname" :value="item.ucode" v-for="item in optionData.jiegoucailiao"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="单位合计:" prop="DWHJ">
								<el-input v-model="ruleForm.DWHJ" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="备注:" prop="BZ">
								<el-input v-model="ruleForm.BZ" :rows='4' type="textarea" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
						</el-col>

					</el-row>













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
		AddHousehold_Sub,
		EditHousehold_Sub,
		getHouseClass,
		GetQuotaItemList,
		GetDictItemsByUcode
	} from '@/api';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'huxinxidiaocha_fly_add',
		computed: {
			...mapGetters(['householdId', 'parcelId', 'projectNo', 'Locationno'])
		},
		data: function() {
			return {
				ruleForm: {},
				typeData: [], //结构类型
				dingeData: [], //定额代码
				optionData:{},
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					FWWMC: [{
						required: true,
						message: '请填写附属物名称',
						trigger: 'blur'
					}, ],
					JGLX_DESC: [{
						required: true,
						message: '请选择结构类型',
						trigger: 'blur'
					}, ],
					DWHJ: [{
						required: true,
						message: '请选择单位',
						trigger: 'blur'
					}, ],
					FSWJGCL: [{
						required: true,
						message: '请选择结构材料',
						trigger: 'blur'
					}, ],
					ZLCC: [{
						required: true,
						message: '请填写丈量尺寸',
						trigger: 'blur'
					}, ],
					FSWSL: [{
						required: true,
						message: '请填写数量',
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
		watch: {
			ruleForm: {
				handler(val, old) {
					if (val.DEDJ && val.FSWSL) {
						val.DWHJ = Math.floor(val.DEDJ * val.FSWSL * 100) / 100;
					} else {
						val.DWHJ = 0;
					}
					// console.log(val);
				},
				deep: true,
			},
		},
		mounted: function() {
			// console.log(this.dialogForm)
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.disabled = true;
				this.ruleForm = JSON.parse(JSON.stringify(this.dialogForm));
				this.ruleForm.FSWDEDM = this.ruleForm.FSWDEDM ? this.ruleForm.FSWDEDM.toString() : '';
			}
			this.getHouseClassInit(); //种类类型
			this.zidianInit("10050008", 'jiegouleixing',1); //结构类型
			this.zidianInit("10050009", 'jiegoucailiao',1); //结构材料
		},

		methods: {
			zidianInit(ucode, data,level) {
				GetDictItemsByUcode({
					ucode: ucode,
					level: level
				}).then((res) => {
					this.$set(this.optionData, data, res)
					console.log(this.optionData)
				}).catch((res) => {
					console.log(res)
			
				})
			},
			change_type(data) {
				for (var i in this.typeData) {
					if (this.typeData[i].o_virtualitemdesc === data) {
						this.ruleForm.JGLX = this.typeData[i].o_virtualitemno;
					}
				}
				this.$set(this.ruleForm, 'FSWDEDM', '')
				// this.ruleForm.DEDM='';
				this.dingeInit();


			},
			change_DEDM(data) { //定额名称选中
				for (var i in this.dingeData) {
					if (this.dingeData[i].KeyNo === data) {
						// console.log(this.dingeData[i])
						this.ruleForm.FSWDEDM_DESC = this.dingeData[i].msg;
						this.ruleForm.DEDJ = this.dingeData[i].UnitPrice;
					}
				}
			},
			dingeInit() {
				var data = {
					Virtualitemno: this.ruleForm.JGLX,
					CurrentPage: 1,
					PageSize: 1000
				};
				GetQuotaItemList(data).then((res) => {
						var newData = res.list;

						for (var i in newData) {
							newData[i].msg = newData[i].UNAME + `(单价：${newData[i].UnitPrice}${newData[i].Unit})` +
								`${newData[i].Ucondition}`
						}
						this.dingeData = newData;
						// console.log(res,'类型种类')
					})
					.catch((error) => {
						this.dingeData = [];
						console.log(error)
					})
			},
			getHouseClassInit() {
				var data = {
					ProjectNo: this.projectNo,
					id: this.Locationno,
					TypeName: '附属物信息'
				};
				getHouseClass(data).then((res) => {
						this.typeData = res;
						if (this.ruleForm.FSWDEDM) {
							for (var i in this.typeData) {
								if (this.typeData[i].o_virtualitemdesc === this.ruleForm.JGLX_DESC) {
									this.ruleForm.JGLX = this.typeData[i].o_virtualitemno;
								}
							}
							this.dingeInit();
						}
					})
					.catch((error) => {
						this.typeData = [];
						console.log(error)
					})
			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				// self.loading = true;
				this.$refs[formName].validate((valid) => {
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
								TypeName: '附属物信息',
								id: self.householdId,
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
		height: 55vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
