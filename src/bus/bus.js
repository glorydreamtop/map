import Vue from 'vue'

export default new Vue({
	data(){
		return {
			jueseFly:false,
			heardKey:'',
			rowId:'',
			token:'',
			navLocalstrgl:[],
      formData_louqian:'',
      userMsg:'',
      sourceId:'',
      skinIndex_amin:'',
		}
	},
	methods:{
		DemoIndex(){
			if(this.demodata==111){
				console.log("我接受到了")
			}
			//alert(this.demodata);
		},
	},


});
