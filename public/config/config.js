const isDev = /(localhost|192.168)/i.test(window.location.href);
const showMap = true;

const appConfig = {
    baseIp:"http://aglostech1.yicp.io:9080",
    showMap:!isDev,
    mapIp:"http://aglostech1.yicp.io:9099"
}