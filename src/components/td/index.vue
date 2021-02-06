<template>
	<div class="tableMain">
		<div class="header_table_title">

			<div class="margin-top-m">
				<el-cascader placeholder="开始定位" :options="locationData" ref="sysCascader" @change="handleChange($event)" :props="prop"
				 filterable style="width: 100%;"></el-cascader>
			</div>
			<div class="margin-top-m">
				<el-input v-model="Name" placeholder="请搜索地块信息" clearable>
					<el-button slot="append" icon="el-icon-search" @click="lookSearch"></el-button>
				</el-input>
			</div>

			<div class="margin-top-m" v-if="Locationno">
				<el-button icon="al-icon-hutianjia" @click="addClick()" size="mini" title="添加户信息"> </el-button>
				<el-button title="修改户信息" @click="editClick()" size="mini" icon="al-icon-huxiugai" ></el-button>
				<el-button title="删除户信息" @click="delClick()" size="mini" icon="al-icon-shanchu" ></el-button>
				<el-button title="关联地块" @click="linkClick()" size="mini" icon="el-icon-paperclip" ></el-button>
			</div>
			<div>
				<div class="margin-top-m cardMain" v-if="parcelData.length!=0">
					<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" v-for="(item,index) in parcelData">
						<div class="leftMain" :class="buttonIndex===index?'activeRow':''" @click="rowClick(index,item)">
							<div class="item flex-col align-center">
								<i class="al-icon-yonghu text-light"></i>
								<span :title="item.UNAME">{{item.UNAME}}</span>
							</div>

						</div>

					</el-col>
				</div>
				<p class="margin-top-m  text-center" v-if="parcelData.length==0">暂无数据</p>

			</div>


		</div>
		<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
		 class="newStyleDialog " custom-class="td_add_dialog">
			<tdAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></tdAdd>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import tdAdd from '@/components/td/td_fly_add' //城市集镇基本情况调查表
	import {
		GetLocations,
		GetHouseholds,
		GetParcels,
		DelHousehold,
		GetEntitiesTree,
		DelParcel
	} from '@/api';
	export default {
		name: 'Hxx',
		props: {},
		components: {
			tdAdd
		},
		computed: {
			...mapGetters(['projectNo', 'parcelId', 'Locationno'])
		},
		data() {
			return {
				locationData: [],
				buttonShow: false,
				buttonIndex: '',
				newparcelId: '', //块id
				parcelData: [], //块区域
				HouseholdData: [], //户列表数据
				Name: '',
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				Locationno_parent: 0,
				prop: {
					lazy: false,
					checkStrictly: true,
					label: 'desc',
					value: 'no',
				},
			}
		},
		created() {},
		mounted() {
			this.GetLocationInit(); //初始化地区
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
			rowClick(index, item) {
				console.log(this.buttonIndex)
				this.buttonIndex = index;
				this.dialogForm = item;
				this.$sendMessage({ eventName: "CenterAtParcel", params: { id:item.KeyNo }}) 

			},
			enter(index) {
				this.buttonShow = true;
				this.buttonIndex = index;
			},
			leave(index) {
				this.buttonShow = false;
				this.buttonIndex = index;
			},
			parcelChange(data) {
				console.log(data, '选中地块');
				this.$store.commit("hxx/SET_PARCELID", data);
				// console.log(this.parcelId)
			},
			handleChange(event) {
				let pathvalue = this.$refs.sysCascader.getCheckedNodes()[0];
				this.Locationno_parent = event[event.length - 1];
				this.$store.commit("hxx/SET_LOCATIONNO", event[event.length - 1]);
				this.tableListInit();
			},
			tableListInit() {
				// alert (1);
				var data = {
					Locationno: this.Locationno_parent,
					CurrentPage: 1,
					PageSize: 1000
				};
				GetParcels(data).then((res) => {
						console.log(res, '地块')
						this.parcelData = res.list;

					})
					.catch((error) => {
						this.parcelData = [];
						console.log(error)
					})
			},
			
			lookSearch() { //搜索
				this.tableListInit();
			},
			GetLocationInit() {
				var data = {
					ProjectNo: this.projectNo,
				};
				GetEntitiesTree(data).then((res) => {
						this.locationData = res;
						console.log(res, '看这里')

					})
					.catch((error) => {
						self.tableData = [];
						self.tableLoad = false;
						console.log(error)
					})
			},

			editClick(item) {
				var self = this;
				if (this.dialogForm) {
					this.dialogTitle = '修改土地信息';
					this.dialogType = 'edit';
					this.showFlag = true;
				} else {
					this.$message({
						message: '请选择要修改的户信息',
						type: 'warning'
					});
				}


			},
			linkClick(){
				
				var self = this;
				if (self.dialogForm) {
					console.log(self.dialogForm);
					this.$sendMessage({ eventName: "ParcelBind", params: {ParcelId: self.dialogForm.KeyNo }})
					
				} else {
					this.$message({
						message: '请选择地块信息',
						type: 'warning'
					});
				}
				
			},
			delClick() { //修改户信息
				var self = this;
				if (this.dialogForm) {
					this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						center: true,
						type: 'warning'
					}).then(() => {
						DelParcel({
							id: self.dialogForm.KeyNo
						}).then((res) => {
							console.log(res)
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});
							self.tableListInit();

						}).catch((res) => {
							console.log(res);
						})


					}).catch((res) => {

					})
				} else {
					this.$message({
						message: '请选择要删除的户信息',
						type: 'warning'
					});
				}


			},
			addClick() { //添加户信息
				if (this.Locationno_parent) {
					this.dialogForm = '';
					this.dialogTitle = '添加土地信息';
					this.dialogType = 'add';
					this.showFlag = true;
					this.$store.commit('hxx/SET_HOUSEHOLDID', '');
				} else {
					this.$message({
						message: '请选择城市乡镇',
						type: 'warning'
					});
				}

			},
			closeDialog() { //关闭弹出框
               this.tableListInit();
			},
			showStudescode(data) { //监听弹出框是关还是闭
              this.showFlag=data;  
		      this.tableListInit();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		[class*="icon"] {
			font-size: 36px;
			cursor: pointer;
		}
	}


	.cardMain {
		border: 1px solid $white;
		min-height: 200px;
		height: 40vh;
		overflow-y: auto;
	}

	.buttonItem {
		position: absolute;
		background: white;
		width: 100%;
		text-align: center;
		height: 6vh;
		line-height: 6vh;
		cursor: pointer;
	}

	.leftMain {
		position: relative;
	}
</style>
