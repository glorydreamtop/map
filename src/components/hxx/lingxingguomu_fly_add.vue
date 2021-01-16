<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="果木名称:" prop="GMMC">
						<el-input v-model="ruleForm.GMMC" :disabled="dialogType=='look'?true:false" ></el-input>
					</el-form-item>
					<el-form-item label="规格:" prop="GMGG">
						<el-input v-model="ruleForm.GMGG" :disabled="dialogType=='look'?true:false" ></el-input>
					</el-form-item>
					<el-form-item label="类别:" prop="GMLB">
						<el-select v-model="ruleForm.GMLB" @change="change_type" filterable placeholder="请选择类别" 
						 :disabled="dialogType=='look'?true:false" style="width: 100%;">
							<el-option :key="item.o_virtualitemno" :label="item.o_virtualitemdesc" :value="item.o_virtualitemno" v-for="item in typeData">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="品种:" prop="GMPZ">
						<el-select v-model="ruleForm.GMPZ" filterable placeholder="请选择品种:" @change="change_GMPZ"  :disabled="dialogType=='look'?true:false" style="width: 100%;">
							<el-option :key="item.KeyNo" :label="item.msg" :value="item.KeyNo" v-for="item in dingeData">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="单位:" prop="GMDW" v-if="ruleForm.GMDW">
						<el-input v-model="ruleForm.GMDW" :disabled="true" ></el-input>
					</el-form-item>
					<el-form-item label="单项单价:" prop="GMDJ" v-if="ruleForm.GMDJ">
						<el-input v-model="ruleForm.GMDJ" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="数量:" prop="GMSL">
						<el-input-number v-model="ruleForm.GMSL" :min="0" :disabled="dialogType=='look'?true:false" class="input-250"></el-input-number>
					</el-form-item>
					
					<el-form-item label="单项合计:" prop="GMGJ">
						<el-input v-model="ruleForm.GMGJ" :disabled="true" ></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="BZ">
						<el-input v-model="ruleForm.BZ" type="textarea" :rows='7' :disabled="dialogType=='look'?true:false" ></el-input>
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
		AddHousehold_Sub,
		EditHousehold_Sub,
		getHouseClass,
		GetQuotaItemList
	} from '@/api';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'huxinxidiaocha_fly_add',
		computed: {
			...mapGetters(['householdId','parcelId','projectNo','Locationno'])
		},
		data: function() {
			return {
				ruleForm: {
					stationName: '',
				},
				typeData: [], //结构类型
				dingeData: [], //定额代码
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
		watch: {
			ruleForm: {
				handler(val, old) {
					if (val.GMDJ && val.GMSL) {						
						val.GMGJ = Math.floor(val.GMDJ * val.GMSL * 100) / 100;
					}else{
						val.GMGJ =0;
					}
					// console.log(val);
				},
				deep: true,
			},
		},
		components: {},
		props: ['dialogType', 'dialogForm'],
		mounted: function() {
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.disabled = true;
				this.ruleForm = JSON.parse(JSON.stringify(this.dialogForm));
			
			}
			this.getHouseClassInit(); //种类类型

		},

		methods: {
			change_type(data) {
				for (var i in this.typeData) {
					if (this.typeData[i].o_virtualitemno === data) {						
						this.ruleForm.GMLB_DESC = this.typeData[i].o_virtualitemdesc;
						
					}
				}
				
				this.$set(this.ruleForm, 'GMPZ', '')
				this.dingeInit();
			
			
			},
			change_GMPZ(data){
				for (var i in this.dingeData) {
					if (this.dingeData[i].KeyNo === data) {
						console.log(this.dingeData[i])
						this.ruleForm.DEDM_DESC=this.dingeData[i].msg;
						this.ruleForm.GMDW=this.dingeData[i].Unit;
						this.ruleForm.GMDJ= this.dingeData[i].UnitPrice;	
					}
				}
				
			},
			dingeInit() {
				var data = {
					Virtualitemno: this.ruleForm.GMLB,
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
						console.log(res,'类型种类')
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
					TypeName: '零星果木'
				};
				getHouseClass(data).then((res) => {
						this.typeData = res;
						console.log(res,this.ruleForm)
						if (this.ruleForm.GMPZ) {
							for (var i in this.typeData) {
								if (this.typeData[i].o_virtualitemdesc === this.ruleForm.GMPZ) {
								
									this.ruleForm.GMPZ_no = this.typeData[i].o_virtualitemno;
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
								TypeName: '零星果木',
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
		height:70vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
