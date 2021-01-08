<template>
	<div class="tableMain">
		<div class="header_table_title">
			<div class="margin-top-m">
				<el-input v-model="Name" placeholder="请搜索工业名称" clearable>
					<el-button slot="append" icon="el-icon-search" @click="lookSearch"></el-button>
				</el-input>
			</div>
			<div class="margin-top-m">
				<el-button icon="al-icon-tianjia" @click="addClick()" size="mini" plain title="添加工业信息"> </el-button>
				<el-button title="修改工业信息" @click="editClick()" size="mini" icon="al-icon-xiugai" plain></el-button>
				<el-button title="删除工业信息" @click="delClick()" size="mini" icon="al-icon-shanchu" plain></el-button>
			</div>
			<div>
				<div class="margin-top-m cardMain" v-if="HouseholdData.length!=0">
					<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" v-for="(item,index) in HouseholdData">
						<div class="leftMain" :class="buttonIndex===index?'activeRow':''" @click="rowClick(index,item)">
							<div class="item flex-col align-center">
								<i class="al-icon-gongyeqiyetiaochabiao text-light"></i>
								<span>{{item.HZ}}</span>
							</div>

						</div>

					</el-col>
				</div>
				<p class="margin-top-m  text-center" v-if="HouseholdData.length==0">暂无数据</p>

			</div>


		</div>
		<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
		 class="newStyleDialog " custom-class="hxx_add_dialog">
			<gyqyHeaderAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></gyqyHeaderAdd>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import gyqyHeaderAdd from '@/components/gyqy/gyqy_header_add' //城市集镇基本情况调查表
	import {
		GetLocations,
		GetHouseholds,
		GetParcels,
		DelHousehold
	} from '@/api';
	export default {
		name: 'Hxx',
		props: {},
		components: {
			gyqyHeaderAdd
		},
		computed: {
			...mapGetters(['projectNo', 'parcelId', 'Locationno'])
		},
		data() {
			return {
				buttonShow: false,
				buttonIndex: '',
				HouseholdData: [{
						HZ: '工业1'
					},
					{
						HZ: '工业2'
					},
					{
						HZ: '工业3'
					}
				], //户列表数据
				Name: '',
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
			}
		},
		created() {},
		mounted() {},
		methods: {
			rowClick(index, item) {
				console.log(this.buttonIndex)
				this.buttonIndex = index;
				this.dialogForm = item;

			},

			GetHouseholdsInit() {
				var data = {
					Locationno: this.Locationno_parent,
					CurrentPage: 1,
					PageSize: 10,
					Name: this.Name,
				};
				GetHouseholds(data).then((res) => {
						this.HouseholdData = res.list;
						// console.log(res,'huxinxi')
					})
					.catch((error) => {
						this.HouseholdData = [];
						this.tableLoad = false;
						console.log(error)
					})
			},
			lookSearch() { //搜索
				this.GetHouseholdsInit();
			},
			editClick(item) {
				var self = this;
				if (this.dialogForm) {
					this.dialogTitle = '修改工业企业信息';
					this.dialogType = 'edit';
					this.showFlag = true;
				} else {
					this.$message({
						message: '请选择要修改的户信息',
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

						DelHousehold({
							id: self.dialogForm.KeyNo
						}).then((res) => {
							console.log(res)
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});
							self.GetHouseholdsInit();

						}).catch((res) => {
							console.log(res);
						})


					}).catch((res) => {

					})
				} else {
					this.$message({
						message: '请选择要删除的工业企业信息',
						type: 'warning'
					});
				}


			},
			addClick() { //添加工业企业信息

				this.dialogForm = '';
				this.dialogTitle = '添加工业企业信息';
				this.dialogType = 'add';
				this.showFlag = true;


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
