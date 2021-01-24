<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<div class="formeHeader">
							<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="formNew">
								<el-row :gutter="20">
									<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
										<el-form-item label="工程类型:" prop="GCLX">
											<el-select v-model="ruleForm.GCLX" filterable :disabled="disabled" placeholder="请选择工程类型">
												<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
												<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
												<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="起讫点:" prop="stationName">
											<el-input v-model="ruleForm.QQD" placeholder="请输入起讫点"></el-input>
										</el-form-item>
										
										<el-form-item label="总长度:" prop="stationName">
											<el-input v-model="ruleForm.ZCD" placeholder="请输入总长度"></el-input>
										</el-form-item>
										<el-form-item label="高程范围1:" prop="GCFW1">
											<el-input v-model="ruleForm.GCFW1" placeholder="请输入高程范围1"></el-input>
										</el-form-item>
										<el-form-item label="建成年月:" prop="ZYCPPZ">
											<el-date-picker v-model="ruleForm.JCNY" type="date" placeholder="请选择建成年月"> </el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
										<el-form-item label="区县:">
											<el-select v-model="ruleForm.County" filterable :disabled="disabled" placeholder="请选择区县" @change="change_county">
												<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="线路类型:" prop="XLLX">
											<el-input v-model="ruleForm.XLLX" placeholder="请输入线路类型"></el-input>
										</el-form-item>
										<el-form-item label="线路名称:" prop="XLMC">
											<el-input v-model="ruleForm.XLMC" placeholder="请输入线路名称"></el-input>
										</el-form-item>
										<el-form-item label="权属部门:" prop="stationName">
											<!-- <el-select v-model="ruleForm.QS" filterable :disabled="disabled" placeholder="请选择区县" @change="change_town">
												<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in townData">
												</el-option>
											</el-select> -->
											<el-input v-model="ruleForm.QS" placeholder="请输入权属部门"></el-input>
										</el-form-item>
										<el-form-item label="高程范围2:" prop="GCFW1">
											<el-input v-model="ruleForm.GCFW2" placeholder="请输入高程范围2"></el-input>
										</el-form-item>
									</el-col>
									
								</el-row>
							</el-form>
							<div class="dialog_foot" v-show="dialogType!='look'&&!disabled">
								<span class="btn_foot">
									<el-button class="button-l" type="primary" @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
								</span>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item title="电信线路" name="2" v-if="KeyNo">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem('dxxl',0)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem('dxxl',0)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem('dxxl',0)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="tableItemData0" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							 :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column type="index" label="序号" align="left"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="YXCD" label="影响长度" align="center"></el-table-column>
								<el-table-column prop="QQDD" label="起讫地点" align="center"></el-table-column>
								<el-table-column prop="XCJXJ" label="线材及线径" align="center"></el-table-column>
								<el-table-column prop="GGXH" label="规格型号" align="center"></el-table-column>
								<el-table-column prop="GZ" label="杆质" align="center"></el-table-column>
								<el-table-column prop="QT" label="其他" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="电信通信站" name="3" v-if="KeyNo">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem('txz',1)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem('txz',1)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem('txz',1)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="tableItemData1" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							  :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column type="index" label="序号" align="left"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="DJ" label="等级" align="center"></el-table-column>
								<el-table-column prop="QS" label="权属" align="center"></el-table-column>
								<el-table-column prop="GM" label="规模" align="center"></el-table-column>
								<el-table-column prop="JCSJ" label="建成时间" align="center"></el-table-column>
								<el-table-column prop="DD" label="地点" align="center"></el-table-column>
								<el-table-column prop="JGLX" label="机构类型" align="center"></el-table-column>
								<el-table-column prop="JGSL" label="结构数量" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="电信附属设备" name="4" v-if="KeyNo">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem('fssb',2)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem('fssb',2)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem('fssb',2)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="tableItemData2" highlight-current-row border style="width: 100%" class="margin-top-m"
							 height="25vh" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
							 row-key="value" default-expand-all @row-click="rowClick">
								<el-table-column type="index" label="序号" align="left"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="DJ" label="隶属关系" align="center"></el-table-column>
								<el-table-column prop="JGLX" label="结构类型" align="center"></el-table-column>
								<el-table-column prop="JGSL" label="规格型号" align="center"></el-table-column>
								<el-table-column prop="SL" label="数量" align="center"></el-table-column>
								<el-table-column prop="RL" label="容量" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>

				</el-collapse>

				<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " :custom-class="`${fly2_dialogPage}_dialog`">
					<components :is="fly2_dialogPage" :dialog-type="fly2_dialogType" v-on:showStudes="showStudescode"
					 :dialog-form="fly2_dialogForm" v-if="showFlag" :type-name="title[fly2_dialogIndex]"></components>

				</el-dialog>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		GetLocations,
		UpdateBaseTablesBaseAttrs,
		GetBaseTablesListAttrs,
		AddBaseTablesBaseAttrs,
		GetJBQKDCBItems,
		GetSerialNumber,
		DeleteBaseTablesAttr,
		GetSpecialprojects_SUBS,
		DelSpecialprojects_SUB,
		AddSpecialprojects_BASE,
		EditSpecialprojects_BASE,
	} from '@/api'
	import dxxl from './dianxin_dxxl_add' //电信线路
	import txz from './dianxin_txz_add' //通信站
	import fssb from './dianxin_fssb_add' //附属设备
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['projectNo', 'TypeName', 'KeyNo'])
		},
		components: {
			dxxl,
			txz,
			fssb
		},
		data() {
			return {
				title: ['电信线路', '电信通信站', '电信附属设备'],
				countyData: [], //区县数据
				townData: [], //城镇数据
				villageData: [], //村庄数据
				villageGroupData: [], //村庄小组
				dialogTitle: '', //弹出框标题
				fly2_dialogForm: "", //弹出框表单
				fly2_dialogIndex: '',
				fly2_dialogPage:'',
				showFlag: false, //弹出框显隐状态
				fly2_dialogType: '', //弹出框操作类型
				activeFormIndex: ['1'], //当前手风琴默认打开
				ruleForm: {
					County: '',
					Town: '',
					Village: '',
					VillageGroup: '',
					Region: '',

				},
				bianDian_form: {},
				tableItemData0: [], //数据项列表数据
				tableItemData1: [], //数据项列表数据
				tableItemData2:[],
				bianDian_tableData: [],
				jianZhu_tableData: [],
				tableData: [],
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					Region: [{
						required: true,
						message: '请选择区县',
						trigger: 'change'
					}, ],

				},
				tableLoad: false,
				submitLoad: false,

			}
		},
		props: ['dialogType', 'dialogForm'],
		mounted() {
			console.log(this.dialogForm, '传参')
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				if (this.dialogType == 'look') {
					this.disabled = true;
				}
				this.ruleForm =JSON.parse(JSON.stringify(this.dialogForm)) ;
				this.$store.commit('jbqk/set_KeyNo', this.dialogForm.KeyNo)
				this.GetLocationInit(0, 'countyData'); //获取区县
				this.GetLocationInit(this.dialogForm.County, 'townData'); //获取乡镇
				this.GetLocationInit(this.dialogForm.Town, 'villageData'); //获取村委
				this.GetLocationInit(this.dialogForm.Village, 'villageGroupData'); //获取村委组
				for(var i in this.title){
				   this.GetSpecialprojects_SUBSInit(this.title[i],i);
				}
			} else {
				this.$store.commit('jbqk/set_KeyNo', '')
				this.GetLocationInit(0, 'countyData'); //获取地区
			}
			// this.GetJBQKDCBItemsInit();
		},
		created() {},

		methods: {
			rowClick(row, column) { //单击表格一行
				this.fly2_dialogForm = row;
			},
			addTableItem(data, index) { //添加项目

				this.fly2_dialogForm = '';
				this.dialogTitle = `添加${this.title[index]}`;
				this.fly2_dialogPage = data;
				this.fly2_dialogType = 'add';
				this.fly2_dialogIndex = index;
				this.showFlag = true;
			},
			editTableItem(data, index) { //添加
				if (this.fly2_dialogForm) {
					this.fly2_dialogPage = data;
					this.dialogTitle = `添加${this.title[index]}`;
					this.fly2_dialogType = 'edit';
					this.fly2_dialogIndex = index;
					this.showFlag = true;
				} else {
					this.$message({
						message: '请选择要编辑的数据项',
						type: 'error',
						center: true
					})
				}

			},
			delTableItem(data, index) { //删除
				console.log(this.fly2_dialogForm)
				if (this.fly2_dialogForm) {
					var self = this;
					this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						center: true,
						type: 'warning'
					}).then(() => {
						DelSpecialprojects_SUB({
							id: this.fly2_dialogForm.KeyNo
						}).then((res) => {
							console.log(res)
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});
							for(var i in self.title){
							   self.GetSpecialprojects_SUBSInit(self.title[i],i);
							}

						}).catch((res) => {
							console.log(res);
						})


					}).catch((res) => {

					})
				} else {
					this.$message({
						message: '请选择要删除的数据项',
						type: 'error',
						center: true
					})
				}

			},
			GetSpecialprojects_SUBSInit (TypeName,index) { //获取数据项
			    index=Number(index);
				var data = {
					id: this.KeyNo,
					TypeName:TypeName,
					CurrentPage:1,
					PageSize:10000,
				};
				GetSpecialprojects_SUBS(data).then((res) => {
						this.[`tableItemData${index}`]= res.list;
					})
					.catch((error) => {
						console.log(error)
						this.[`tableItemData${index}`]= [];
						console.log(error)
					})
			},
			change_county(data) { //选中区县,获取乡镇
				for (var i = 0; i < this.countyData.length; i++) {
					if (data == this.countyData[i].o_locationno) {
						this.ruleForm.CountyDESC = this.countyData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data, 'townData'); //获取乡镇
			},
			change_town(data) { //选中乡镇,获取村委
				for (var i = 0; i < this.townData.length; i++) {
					if (data == this.townData[i].o_locationno) {
						this.ruleForm.TownDESC = this.townData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data, 'villageData'); //获取村委
			},
			change_village(data) { //选中村委,获取村委组
				for (var i = 0; i < this.villageData.length; i++) {
					if (data == this.villageData[i].o_locationno) {
						this.ruleForm.VillageDESC = this.villageData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data, 'villageGroupData'); //获取村委组
			},
			change_VillageGroup(data) { //选中村委组
				for (var i = 0; i < this.villageGroupData.length; i++) {
					if (data == this.villageGroupData[i].o_locationno) {
						this.ruleForm.VillageGroupDESC = this.villageGroupData[i].o_locationdesc;

					}
				}

			},
			GetLocationInit(id, type) {
				var data = {
					Locationno: id,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
						this[type] = res;
					})
					.catch((error) => {
						this.tableData = [];
						console.log(error)
					})
			},

			closeDialog() { //关闭弹出框
				for(var i in this.title){
				   this.GetSpecialprojects_SUBSInit(this.title[i],i);
				}
			},
			showStudescode(data) { //监听弹出框是关还是闭
				this.showFlag = data;
				for(var i in this.title){
				   this.GetSpecialprojects_SUBSInit(this.title[i],i);
				}

			},
			submitForm(formName) { //表单提交按钮
				this.$refs[formName].validate((valid) => {
					var self = this;
					if (valid) {
						this.submitLoad = true;
						if (self.dialogType == 'add') { //添加时候先获取编号
							var url = AddSpecialprojects_BASE;
							var data = {
								ProjectNo: self.projectNo,
								TypeName: this.TypeName,
								JsonStr: JSON.stringify(self.ruleForm)
							};
							console.log(data, self.ruleForm)
						} else {
							var url = EditSpecialprojects_BASE;
							var  newData=JSON.parse(JSON.stringify(self.ruleForm));
							delete newData.DCRY;
							delete newData.DCRQ;
							// delete newData.DXBH;
							var data = {
								id: self.KeyNo,
								JsonStr:newData
							};
						}
						url(data).then((res) => {
							this.submitLoad = false;
							if (self.dialogType == 'add') {
								this.$store.commit('jbqk/set_KeyNo', res[0].Keyno)
							}
							this.disabled = true;
							this.$message({
								message: '添加表基础信息成功',
								type: 'success',
								center: true
							})
						}).catch((res) => {
							console.log(res)
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
		height: 80vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
