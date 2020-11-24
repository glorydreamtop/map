<template>
	<div class="wrapper bg-primary padding-top-l">
		<el-tabs v-model="activeTab" @tab-click="check">
			<el-tab-pane label="统计信息" name="first"></el-tab-pane>
			<el-tab-pane label="详细信息" name="second">
				<el-collapse v-model="activeName" class="bg-primary margin-lr-l" accordion>
					<el-collapse-item title="基本情况调查表" name="1">
						<template slot="title">
							基本情况调查表
							<span style="position: absolute; right: 2vw;" @click="jbqkTable_more()">更多</span>
						</template>
						<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
						<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
					</el-collapse-item>
					<el-collapse-item title="土地调查表" name="2">
						<div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
						<div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
					</el-collapse-item>
					<el-collapse-item title="户信息调查表" name="3">
						<div>简化流程：设计简洁直观的操作流程；</div>
						<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
						<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
					</el-collapse-item>
					<el-collapse-item title="农村专项设施调查表" name="4">
						<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
						<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
					</el-collapse-item>
					<el-collapse-item title="专项项目调查表" name="5">
						<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
						<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
					</el-collapse-item>
					<el-collapse-item title="工业企业调查表" name="6">
						<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
						<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
					</el-collapse-item>
				</el-collapse>
			</el-tab-pane>
		</el-tabs>
		<div  v-if="dialogType=='open_jbqkTbale'">
		   <el-dialog :title="dialogTitle" :modal-append-to-body='false' @close='closeDialog' :close-on-click-modal="true" :visible.sync="showFlag"  
		      v-model="showFlag" class="newStyleDialog " custom-class="jbqkTable_dialog"	>
		    <jbqkTableHome  :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag" ></jbqkTableHome>
		  </el-dialog>
		</div>
	</div>
</template>

<script>
	import jbqkTableHome from '@/components/jbTablePage/jbTable_home.vue' //基本情况表-更多操作
	export default {
		name: "Index",
		props: {},
		components: {
			jbqkTableHome
		},
		data() {
			return {
				activeTab: "second",
				activeName: "",
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
			};
		},

		created() {},
		mounted() {},
		methods: {
			check() {},
			jbqkTable_more() { //基本情况调查表更多
				this.dialogTitle = "基本情况调查表";
				this.showFlag = true;
				this.dialogForm = '';
				this.dialogType = 'open_jbqkTbale';
			},
			closeDialog() { //关闭弹出框

			},
			showStudescode(data) { //监听弹出框是关还是闭

			},
		}
	};
</script>

<style lang="scss" scoped>
	.wrapper {
		position: fixed;
		left: 0;
		top: 70px;
		bottom: 0;
		width: 25vw;
	}

	::v-deep .el-tabs__item {
		color: $white;
		text-align: center;
		width: 50%;
		padding: 0;
	}

	::v-deep .el-tabs__nav {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.el-collapse {
		border-top: none;
	}

	::v-deep .el-collapse-item__header {
		background-color: $primary;
		color: $white;
		border-bottom: 1px solid $sub;
	}
</style>
