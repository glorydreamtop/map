<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-form-item label="房屋名称:" prop="FWMC">
						<el-input v-model="ruleForm.FWMC" :disabled="dialogType=='look'?true:false" class="input-250"></el-input>
					</el-form-item>
                   
					<el-form-item label="结构类型:" prop="JGLX">
						<el-select v-model="ruleForm.JGLX" @change="change_type"  ref="JGLX"  filterable placeholder="请选择结构类型" class="input-250" :disabled="dialogType=='look'?true:false">
							<el-option :key="item.o_virtualitemno" :label="item.o_virtualitemdesc" :value="item.o_virtualitemdesc" v-for="item in typeData">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="定额名称:" prop="DEDM">
						<el-select v-model="ruleForm.DEDM" filterable placeholder="请选择定额名称" class="input-250" :disabled="dialogType=='look'?true:false">
							<el-option :key="item.KeyNo" :label="item.msg" :value="item.msg" v-for="item in dingeData">
							</el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="建筑风格或形式:" prop="JZFGHXS">
						<el-input v-model="ruleForm.JZFGHXS" :disabled="dialogType=='look'?true:false" class="input-250"></el-input>
					</el-form-item>
					<el-form-item label="屋面材料:" prop="WMCL">
						<el-input v-model="ruleForm.WMCL" :disabled="dialogType=='look'?true:false" class="input-250"></el-input>
					</el-form-item>
					<el-form-item label="层数:" prop="CS">
						<el-input v-model="ruleForm.CS" :disabled="dialogType=='look'?true:false" class="input-250" ></el-input>
					</el-form-item>
					<el-form-item label="层高(m):" prop="CGM">
						<el-input v-model="ruleForm.CGM" :disabled="dialogType=='look'?true:false" class="input-250"></el-input>
					</el-form-item>
					<el-form-item label="丈量尺寸(m×m):" prop="ZLCCMM">
						<el-input v-model="ruleForm.ZLCCMM" :disabled="dialogType=='look'?true:false" class="input-250"></el-input>
					</el-form-item>
					<el-form-item label="建筑面积(㎡):" prop="JZMJM2">
						<el-input v-model="ruleForm.JZMJM2" :disabled="dialogType=='look'?true:false" class="input-250"></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="BZ">
						<el-input v-model="ruleForm.BZ" type="textarea" :rows='4' :disabled="dialogType=='look'?true:false" class="input-600"></el-input>
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
				},
				typeData:[],//结构类型
				dingeData:[],//定额代码
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
			console.log(this.dialogForm,this.Locationno)
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.disabled = true;
				this.ruleForm=JSON.parse(JSON.stringify(this.dialogForm)) ;
				
			}
            this.getHouseClassInit();//种类类型
		},

		methods: {
		    change_type(data){
				for( var i in this.typeData){
					if(this.typeData[i].o_virtualitemdesc===data){
						this.ruleForm.DEDM_no=this.typeData[i].o_virtualitemno;
					}
				}
				this.$set(this.ruleForm,'DEDM','')
				// this.ruleForm.DEDM='';
				this.dingeInit();
				
				
			},
			dingeInit(){
				var data = {
					Virtualitemno:this.ruleForm.DEDM_no,
					CurrentPage: 1,
					PageSize: 1000
				};
				GetQuotaItemList(data).then((res) => {
					    var newData= res.list;
						
						for(var i in newData){
							newData[i].msg=newData[i].UNAME+`(单价：${newData[i].UnitPrice}${newData[i].Unit})`+`${newData[i].Ucondition}`
						}
						this.dingeData =newData;
						// console.log(res,'类型种类')
					})
					.catch((error) => {
						this.dingeData = [];
						console.log(error)
					})
			},
			getHouseClassInit(){
				var data = {
					ProjectNo: this.projectNo,
					id: this.Locationno,
					TypeName: '房屋信息'
				};
				getHouseClass(data).then((res) => {
						this.typeData = res;
						if(this.ruleForm.DEDM){
							for( var i in this.typeData){
								if(this.typeData[i].o_virtualitemdesc===this.ruleForm.JGLX){
									this.ruleForm.DEDM_no=this.typeData[i].o_virtualitemno;
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
								TypeName: '房屋信息',
								id:self.householdId,
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
		height:55vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
