<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="el-icon-plus" @click="addClick()" plain title="添加户信息"> </el-button>
			<div class="margin-top-m">
				<el-cascader placeholder="开始定位" :options="locationData" ref="sysCascader" @change="handleChange($event)" :props="prop"
				 filterable style="width: 100%;"></el-cascader>
			</div>
			<div class="margin-top-m">
				<el-select v-model="newparcelId" placeholder="请选中块信息" @change="parcelChange">
				    <el-option  v-for="item in parcelData"  :key="item.KeyNo" :label="item.UNAME"    :value="item.KeyNo">
				    </el-option>
				</el-select>
			</div>
			<div class="margin-top-m">
				<el-input v-model="search" placeholder="请搜索户信息" prefix-icon="el-icon-search"></el-input>
				<!-- <el-cascader placeholder="请搜索户信息" :options="areaOptions" filterable style="width: 100%;"></el-cascader> -->
			</div>
			<div class="margin-top-m">
				<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" v-for="item in HouseholdData">
					<div class="leftMain">
						<div class="item flex-col align-center" @click="openDetail(item)">
							<i class="al-icon-xiangmuguanli text-light"></i>
							<span>{{item.HZ}}</span>
						</div>
					</div>

				</el-col>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
		 class="newStyleDialog " custom-class="hxx_add_dialog">
			<hxxAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></hxxAdd>
		</el-dialog>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import hxxAdd from '@/components/hxx/hxx_fly_add' //城市集镇基本情况调查表
	import {
		GetLocations,
		GetHouseholds,
		GetParcels,
	} from '@/api';
	export default {
		name: 'Hxx',
		props: {},
		components: {
			hxxAdd
		},
		computed: {
			...mapGetters(['projectNo','parcelId'])
		},
		data() {
			return {
				locationData: [],
				newparcelId:'',//块id
				parcelData:[],//块区域
				HouseholdData:[],//户列表数据
				search: '',
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				Locationno_parent: 0,
				prop: {
					lazy: true,
					checkStrictly: true,

					lazyLoad: this.lazyLoad
				},
			}
		},
		created() {},
		mounted() {
			// this.GetLocationInit(); //初始化地区

		},
		methods: {
			lazyLoad(node, resolve) {
				var self = this;
				// console.log(node, resolve)
				// setTimeout(() => {
				if (node.level < 4) {
					var data = {
						ProjectNo: self.projectNo,
						Locationno: node.value ? node.value : 0
					};
					GetLocations(data).then(res => {
							// console.log(res,'看这里');
							var newLosation = [];
							for (var i in res) {
								newLosation.push({
									value: res[i].o_locationno,
									label: res[i].o_locationdesc,
									leaf: node.level >= 3
								})
							}
							// console.log(newLosation)
							// 通过调用resolve将子节点数据返回，通知组件数据加载完成
							resolve(newLosation);
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					resolve([]);
					console.log('zou2131')
					return;
				}
				// }, 1000);

			},
			parcelChange(data){
				console.log(data,'选中地块');
				this.$store.commit("hxx/SET_PARCELID", data);
				// console.log(this.parcelId)
			},
			handleChange(event) {
				let pathvalue = this.$refs.sysCascader.getCheckedNodes()[0];
				this.Locationno_parent = event[event.length - 1];
				this.$store.commit("hxx/SET_LOCATIONNO", event[event.length - 1]);
				this.GetHouseholdsInit(); //户信息初始化
				this.GetParcelsInit();
				console.log(event, pathvalue, this.Locationno)


			},
			GetParcelsInit() {
				var data = {
					Locationno: this.Locationno_parent,
					CurrentPage: 1,
					PageSize: 1000
				};
				GetParcels(data).then((res) => {
						console.log(res,'地块')
                     this.parcelData=res.list;

				})
				.catch((error) => {
					this.parcelData = [];
					console.log(error)
				})
			},
			GetHouseholdsInit() {
				var data = {
					Locationno: this.Locationno_parent,
					CurrentPage: 1,
					PageSize: 10
				};
				GetHouseholds(data).then((res) => {
				    this.HouseholdData=res.list;
					// console.log(res,'huxinxi')
				})
				.catch((error) => {
					this.HouseholdData = [];
					this.tableLoad = false;
					console.log(error)
				})
			},
			GetLocationInit() {
				var data = {
					ProjectNo: this.projectNo,
					Locationno: this.Locationno_parent
				};
				GetLocations(data).then((res) => {
						this.locationData = res;
						console.log(res)

					})
					.catch((error) => {
						self.tableData = [];
						self.tableLoad = false;
						console.log(error)
					})
			},
			rowClick(row) { //单元格一行点击
				this.dialogForm = row;
				this.dialogTitle = '户信息详情';
				this.dialogType = 'look';
				this.showFlag = true;
			},
			addClick() { //添加户信息
				if(this.newparcelId){
					this.dialogForm = '';
					this.dialogTitle = '添加户信息';
					this.dialogType = 'add';
					this.showFlag = true;
				}else{
					this.$message({
					  message: '请选择地块',
					  type: 'warning'
					});
				}
				
			},
			closeDialog() { //关闭弹出框

			},
			showStudescode(data) { //监听弹出框是关还是闭

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
</style>
