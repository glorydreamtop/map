import {
    baseUrl
  } from './env'
  
  import axios from 'axios';
  
  import storeLockr from 'Lockr'
  
  
  export default (
    url = '',
    data = {},
    method = 'GET',
    success,
    fail,
    reflectionInterface = true,
    headerInfo = 'no'
  ) => {
    //axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  
    axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers['Access-Control-Allow-Method'] = 'GET, POST, OPTIONS';
    const token = sessionStorage.getItem('token');
  
    const paramUrl = 'webapi/Runapi.ashx?paramUrl=';
    let rootUrl = baseUrl + paramUrl;
  
    rootUrl = baseUrl;
  
  
    //@reflectionInterface 是否是反射接口，如果是反射接口，需要改变url以及参数的数据结构。
    if(reflectionInterface){
      const  urlArr=url.split("/");
      const classUrlEn = `GDYZCBusiness.${urlArr[0]}`;
      const functionUrlEn = `${urlArr[1]}`;
      url = `${rootUrl}ReflectInvoke/Invoke?assebleUrlEn=GDYZCBusiness.dll&classUrlEn=${classUrlEn}&functionUrlEn=${functionUrlEn}`;
  
  
    //   let convertData = [];
  
    //   for(let key in data){
    //     convertData.push({"name":key,"value":data[key]});
    //   }
    //   data =[];
    //   convertData.forEach(i=>{
    //     data.push(i);
    //   })
  
    } else {
      url = rootUrl + url;
    }
  
    if (method == 'GET') {
      axios.defaults.headers['Token'] = token;
    //   let dataStr = ''; //数据拼接字符串
    //   Object.keys(data).forEach(key => {
    //     dataStr += key + '=' + data[key] + '&';
    //   })
    //   if (dataStr !== '') {
    //     dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    //     url = url + '?' + dataStr;
    //   }
      return new Promise((resolve, reject) => {
        axios.get(url,{params:data}).then(function (res) {
          if (res) {
            if (typeof success == 'function') {
              resolve(success(res));
            }
          } else {
            window.alert('ERROR:' + JSON.stringify(res));
          }
        }).catch(function (err) {
          if (err) {
            if (typeof fail == 'function') {
              fail(err);
            }
            console.log('ERROR:' + err)
          }
        });
      });
    }
  
  
    if(method == 'POST'||method=='DELETE'){
  
      if(headerInfo !== 'no'){
        axios.defaults.headers['Authorization'] = headerInfo.Authorization;
        data = {};
      }else {
        console.warn(token);
        axios.defaults.headers['Token'] = token;
        //axios.defaults.headers['Token'] = "ce430d48-6572-4359-942b-08ee93cc6951";
      }
  
      // console.warn('URL==========>');
      // console.warn(url);
      // console.warn(data);
      if(method == 'POST')
        return new Promise((resolve, reject) => {
        axios.post(url,data).then(function(res) {
          // if(layerflag!=null)
          //   layer.close(layerflag);
          if (res) {
            if (typeof success == 'function') {
              resolve(success(res));
            }
          } else {
            window.alert('ERROR:' + JSON.stringify(res));
          }
        }).catch(function(err) {
          // layer.close(layerflag);
          if (err) {
            if (typeof fail == 'function') {
              let failResult = {
                code:401,
                msg:'AJAX未知的错误'
              };
              fail(failResult);
              //   console.log(typeof (err));
              //   if(err.indexOf('401') > -1){
              //     failResult.msg('用户名密码错误')
              //   }
              //   fail(failResult);
            }
          }
        })
      });
      else{
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&';
        })
        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
          url = url + '?' + dataStr;
        }
        return new Promise((resolve, reject) => {
          axios.delete(url).then(function(res) {
            // if(layerflag!=null)
            //   layer.close(layerflag);
            if (res) {
              if (typeof success == 'function') {
                resolve(success(res));
  
              }
            } else {
              window.alert('ERROR:' + JSON.stringify(res));
            }
          }).catch(function(err) {
            // layer.close(layerflag);
            if (err) {
              if (typeof fail == 'function') {
                let failResult = {
                  code:401,
                  msg:'AJAX未知的错误'
                };
                fail(failResult);
                //   console.log(typeof (err));
                //   if(err.indexOf('401') > -1){
                //     failResult.msg('用户名密码错误')
                //   }
                //   fail(failResult);
              }
            }
          })
        });
      }
    }
  
  
  
  }
  