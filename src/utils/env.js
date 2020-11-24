/**
 * Created by hchx on 2018/10/9.
 */
/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
import CONFIG from './configData'
let baseUrl = CONFIG.baseUrl; //本地mock接口

let bimUrl = CONFIG.bimUrl; //bim模型加载地址
//bimUrl = baseUrl+'Base_Data/Base.json';
let wbsSettingUrl = CONFIG.wbsUrl; //wbs的配置文件

let kmlUrl = CONFIG.kmlUrl;
let loropUrl = CONFIG.loropUrl;


let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = '/img/';

}else if(process.env.NODE_ENV == 'production'){
  imgBaseUrl = '/img/';
}

export {
  imgBaseUrl,
  baseUrl,
  bimUrl,
  wbsSettingUrl,
  kmlUrl,
  loropUrl
}
