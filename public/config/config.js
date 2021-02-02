const isDev = /(localhost|192.168)/i.test(window.location.href);
const showMap = true;

const appConfig = {
    baseIp:"http://aglostech1.yicp.io:9080",// webapi地址
    // showMap:!isDev,//是否显示地图,当前规则，非开发环 境显示
	showMap:false,
    mapIp:"http://aglostech1.yicp.io:9099"//地图文件地址
}