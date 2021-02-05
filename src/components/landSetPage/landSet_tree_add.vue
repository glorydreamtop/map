<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="节点名称:" v-if="this.dialogForm.level<5">
						<el-cascader placeholder="请选择节点" v-model="project1" filterable clearable ref="cascaderAddr" :options="postionArry"
						 :props="defaultProps" style="width: 100%;" @change="postionChange"></el-cascader>
					</el-form-item>
					<el-form-item label="村委小组:" v-if="this.dialogForm.level==6||this.dialogForm.level==5">
						<el-input v-model="ruleForm.desc" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
				</el-form>
				<div class="margin-top-l text-center " v-show="dialogType!='look'">
					<el-button class="button-l" type="primary" @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		AddLocation_Zu,
		EditLocation,
		EditDict,
		GetDictItemsByUcode,
		AddLocationsByDicts
	} from '@/api'

	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo', 'BaseType'])
		},
		data: function() {
			return {
				ruleForm: {
					JsonStr: [],
				},
				project1: '',
				postionArry: [],
				submitLoad: false,
				disabled: false,
				rules: { //约定的验证规则
					stationName: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],

				},
				defaultProps: {
					children: 'children',
					label: 'label',

				},
				defaultProps: {
					children: 'children',
					label: 'uname',
					value: 'id',
					multiple: true

				}

			}
		},
		dialogType: {
			handler: function(val, oldval) {
				this.dialogType = val;
				this.init();
			},
			deep: true //
		},
		activated() {

		},
		components: {},
		props: ['dialogType', 'dialogForm', 'dialogTable'],
		mounted: function() {
			console.log(this.dialogForm, this.dialogType, '看这里');
			this.GetLocationByIdInit(); //项目层级化

			if (this.dialogType == 'treeedit' || this.dialogType == 'treelook') {
				// this.ruleForm.id=this.dialogForm.no;
				this.$set(this.ruleForm, 'id', this.dialogForm.no);
				this.$set(this.ruleForm, 'desc', this.dialogForm.desc)
				// this.ruleForm.desc=this.dialogForm.desc;
				if (this.dialogType == 'look') {
					this.disabled = true;
				}

			} else {
				this.ruleForm.id = this.dialogForm.no ? this.dialogForm.no : '';
			}
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

			postionChange(data) {

				var itemData = this.$refs["cascaderAddr"].getCheckedNodes();
				console.log(itemData,data) //获得当前节点，
				var newData = [];
				for(var i=0;i<itemData.length;i++){
					for(var j=0;j<itemData[i].pathNodes.length;j++){
						var msg=JSON.parse(JSON.stringify(itemData[i].pathNodes[j].data)) ;
						 msg.children=[];
						 msg.children=itemData[i].pathNodes[j+1]?itemData[i].pathNodes[j+1].data:[];
						 newData.push(msg);
						 break;
						
						
					}
				}
				// this.setTreeOptionInIt(itemData);


				console.log(newData, '看这里')
				this.ruleForm.JsonStr = JSON.stringify(newData);

			},
			setTreeOptionInIt(data) {
				//没有父节点的数据
				// let level = '';
				// let demo = [];
				// let num = -1;
				// for (let key of data) {
				// 	for (let item in key) {
				// 		console.log(key)
				// 		if (level != key.parent) {
				// 			level = key.parent;
				// 			num++;
				// 			demo[num] = {};
				// 		}
				// 		item != 'parent' ? (demo[num][item] = key[item]) : '';
				// 	}
				// }
				console.log(data);
				

			},
			GetLocationByIdInit() { //项目级层初始化
				GetDictItemsByUcode({
						ucode: this.dialogForm.name
					}).then((res) => {
						var newData = res;
						console.log(res, '树形');
						// var newData=this.setList(res,this.dialogTable);
						this.postionArry = newData;

					})
					.catch((error) => {
						this.postionArry = [];
						console.log(error)
					})
			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoad = true;

						if (self.dialogType == 'treeedit') {
							var data = this.ruleForm;
							if(this.dialogForm.level>4){
								var url = EditLocation;
							}else{
								
							}
							
						} else {
							var data = this.ruleForm;
							var url = AddLocation_Zu;
							if(this.dialogForm.level>4){
								
							}else{
								var url =AddLocationsByDicts
							}
						}
						url(data).then((res) => {
							this.submitLoad = false;
							this.$message({
								message: '操作成功',
								type: 'success',
								center: true
							})
							self.$emit('showStudes', false);

						}).catch((res) => {
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
		/* height: 28vh; */
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
