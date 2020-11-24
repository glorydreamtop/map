
//接口基础URL
let baseUrl = 'http://aglostech1.yicp.io:9080/';
let basePath = '';
//baseUrl = "http://221.239.6.188:8093/"; // 河北院STG
//baseUrl ='http://218.14.150.101:8085/';

let textUrl = "http://221.239.6.188:8086/ModelsData/";

let configTOKEN = "";

//模型施工图等资料的基础URL
const dataInfoBaseUrl=baseUrl+"ModelsData/";

const CONFIG = {
  baseUrl:baseUrl,
  basePath:basePath,
  loginStyleInDetail:false, //是否开启登录的图片样式版
  projectName:"",
  projectSubName:"",
  //首页点击小房子按钮回到的定位
  homePostion:{
    x:113.4964944159,
    y:22.8248525935,
    z:88400
  },
  //是否启用登录  启用登录true,不启用false
  loginSwitch:true,
}
export default CONFIG






