<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<div class="formeHeader">
							<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
								<el-form-item label="工程类型:" prop="Region">
									<el-select v-model="ruleForm.Region" filterable :disabled="disabled" placeholder="请选择工程类型" class="input-200">
										<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
										<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
										<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="区县:" prop="stationName">
									<el-select v-model="ruleForm.County" filterable :disabled="disabled" placeholder="请选择区县" @change="change_county"
									 class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="公路名称:" prop="XLMC">
									<el-input class="input-200" v-model="ruleForm.XLMC" placeholder="请输入公路名称"></el-input>
								</el-form-item>
								<el-form-item label="起讫点:" prop="stationName">
									<el-input class="input-200" v-model="ruleForm.ZDMJ" placeholder="请输入起讫点"></el-input>
								</el-form-item>
								<el-form-item label="公路等级:" prop="GLDJ">
									<el-input class="input-200" v-model="ruleForm.GLDJ" placeholder="请输入公路等级"></el-input>
								</el-form-item>
								<el-form-item label="隶属关系:" prop="LSGX">
									<el-select v-model="ruleForm.LSGX" filterable :disabled="disabled" placeholder="请选择隶属关系" @change="change_town"
									 class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in townData">
										</el-option>
									</el-select>

								</el-form-item>
								<el-form-item label="功能:" prop="GN">
									<el-input class="input-200" v-model="ruleForm.GN" placeholder="请输入功能"></el-input>
								</el-form-item>
								<el-form-item label="建成时间:" prop="JCSJ">
									<el-date-picker class="input-200" v-model="ruleForm.JCSJ" type="date" placeholder="请选择建成时间"> </el-date-picker>
								</el-form-item>


							</el-form>
							<div class="dialog_foot" v-show="dialogType!='look'&&!disabled">
								<span class="btn_foot">
									<el-button class="button-l" type="primary" @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
								</span>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item title="线路路段" name="2">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(0)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(0)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(0)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="tableItemData" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							 :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column type="SDBH" label="线路编号" align="left"></el-table-column>
								<el-table-column prop="LDMC" label="路段名称" align="center"></el-table-column>
								<el-table-column prop="JTLL" label="交通流量" align="center"></el-table-column>
								<el-table-column prop="YXCD" label="影响长度" align="center"></el-table-column>
								<el-table-column prop="QQD" label="起讫点" align="center"></el-table-column>
								<el-table-column prop="LMCL" label="路面材料" align="center"></el-table-column>
								<el-table-column prop="ZDZP" label="最大纵坡" align="center"></el-table-column>
								<el-table-column prop="LJLMKD" label="路基路面宽度" align="center"></el-table-column>
								<el-table-column prop="LJLMZDGC" label="路基路面最低高程" align="center"></el-table-column>
							</el-table>
						</div>
					</el-collapse-item>

					<el-collapse-item title="桥涵" name="3">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(1)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(1)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(1)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="bianDian_tableData" highlight-current-row border style="width: 100%" class="margin-top-m"
							 height="25vh" :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
							 row-key="value" default-expand-all @row-click="rowClick">
								<el-table-column prop="SDBH" label="编号" align="center"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="DJ" label="等级" align="center"></el-table-column>
								<el-table-column prop="KJ" label="跨径" align="center"></el-table-column>
								<el-table-column prop="KD" label="宽度" align="center"></el-table-column>
								<el-table-column prop="ZHBZ" label="荷载标准" align="center"></el-table-column>
								<el-table-column prop="JG" label="结构" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="房屋" name="4">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(2)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(2)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(2)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="jianZhu_tableData" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							 :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column prop="FWBH" label="编号" align="center"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="YT" label="用途" align="center"></el-table-column>
								<el-table-column prop="JG" label="结构" align="center"></el-table-column>
								<el-table-column prop="SL" label="面积" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="附属物" name="5">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(3)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(3)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(3)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="jianZhu_tableData" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							 :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column prop="JZWBH" label="编号" align="center"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="JG" label="结构" align="center"></el-table-column>
								<el-table-column prop="SL" label="数量" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="其他建筑物" name="6">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(4)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(4)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(4)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="jianZhu_tableData" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							 :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column prop="JZWBH" label="编号" align="center"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="LB" label="类别" align="center"></el-table-column>
								<el-table-column prop="JG" label="结构" align="center"></el-table-column>
								<el-table-column prop="SL" label="数量" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="零星果木" name="7">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(5)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(5)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(5)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="jianZhu_tableData" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							 :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column prop="JZWBH" label="编号" align="center"></el-table-column>
								<el-table-column prop="MC" label="名称" align="center"></el-table-column>
								<el-table-column prop="LB" label="类别" align="center"></el-table-column>
								<el-table-column prop="JG" label="规格" align="center"></el-table-column>
								<el-table-column prop="DW" label="单位" align="center"></el-table-column>
								<el-table-column prop="SL" label="数量" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
				</el-collapse>

				<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " :custom-class="`${fly2_dialogIndex}_dialog`">
					<components :is="fly2_dialogIndex" :dialog-type="fly2_dialogType" :dialog-table="tableItemData" v-on:showStudes="showStudescode"
					 :dialog-form="fly2_dialogForm" v-if="showFlag"></components>

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
		DeleteBaseTablesAttr
	} from '@/api'
	import xianlu from './gonglu_xianlu_add' //线路
	import qiaohan from './gonglu_qiaohan_add' //桥涵
	import fangwu from './gonglu_fangwu_add' //房屋
	import fushuwu from './gonglu_fushuwu_add' //附属物
	import lingxingguomu from './gonglu_lingxingguomu_add' //零星果木
	import qitajianzhuwu from './gonglu_qitajianzhuwu_add' //其他建筑
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['projectNo', 'BaseType', 'KeyNo'])
		},
		components: {
			xianlu,
			fushuwu,
			qiaohan,
			fangwu,
			lingxingguomu,
			qitajianzhuwu
		},
		data() {
			return {
				title: ['线路路段', '桥涵', '房屋', '附属建筑物', '其他建筑物', '零星果木'],
				pageRouter: ['xianlu', 'qiaohan', 'fangwu', 'fushuwu', 'qitajianzhuwu', 'lingxingguomu'],
				countyData: [], //区县数据
				townData: [], //城镇数据
				villageData: [], //村庄数据
				villageGroupData: [], //村庄小组
				dialogTitle: '', //弹出框标题
				fly2_dialogForm: "", //弹出框表单
				fly2_dialogIndex: '',
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
				tableItemData: [], //数据项列表数据
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
				this.ruleForm = this.dialogForm;
				this.$store.commit('jbqk/set_KeyNo', this.dialogForm.KeyNo)
				this.GetLocationInit(0, 'countyData'); //获取区县
				this.GetLocationInit(this.dialogForm.County, 'townData'); //获取乡镇
				this.GetLocationInit(this.dialogForm.Town, 'villageData'); //获取村委
				this.GetLocationInit(this.dialogForm.Village, 'villageGroupData'); //获取村委组
				this.GetJBQKDCBItemInit(); //获取数据项
			} else {
				this.$store.commit('jbqk/set_KeyNo', '')
				this.GetLocationInit(0, 'countyData'); //获取地区
			}
			// this.GetJBQKDCBItemsInit();
		},
		created() {},

		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				return row.ClassName;
			},
			rowClick(row, column) { //单击表格一行
				console.log(row, column);
				if (row.ClassName == "singleitem") {
					this.fly2_dialogForm = row;

				}
			},
			addTableItem(index) { //添加项目

				this.fly2_dialogForm = '';
				this.dialogTitle = `添加${this.title[index]}`;
				this.fly2_dialogIndex = this.pageRouter[index];
				this.fly2_dialogType = 'add';
				this.showFlag = true;
			},
			editTableItem(index) { //添加
				if (this.fly2_dialogForm) {
					this.fly2_dialogIndex = this.pageRouter[index];
					this.dialogTitle = `添加${this.title[index]}`;
					this.fly2_dialogType = 'edit';
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
						DeleteBaseTablesAttr({
							id: this.fly2_dialogForm.KeyNo
						}).then((res) => {
							console.log(res)
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});
							self.GetJBQKDCBItemInit();

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
			GetJBQKDCBItemInit() { //获取数据项
				console.log(this.KeyNo)
				var data = {
					id: this.KeyNo
				};
				GetBaseTablesListAttrs(data).then((res) => {
						this.tableItemData = res;
						console.log(res, this.tableItemData, '获取数据项')
					})
					.catch((error) => {
						this.tableItemData = [];
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
				this.GetJBQKDCBItemInit();
			},
			showStudescode(data) { //监听弹出框是关还是闭
				this.showFlag = data;
				this.GetJBQKDCBItemInit();

			},
			submitForm(formName) { //表单提交按钮
				this.$refs[formName].validate((valid) => {
					var self = this;
					if (valid) {
						this.submitLoad = true;
						if (self.dialogType == 'add') { //添加时候先获取编号
							var url = AddBaseTablesBaseAttrs;
							var data = {
								ProjectNo: self.projectNo,
								BaseType: this.BaseType,
								id: self.ruleForm.Village,
								JsonStr: JSON.stringify(self.ruleForm)
							};
						} else {
							var url = UpdateBaseTablesBaseAttrs;
							var data = {
								id: self.KeyNo,
								JsonStr: JSON.stringify(self.ruleForm)
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
