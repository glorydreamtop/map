import request from '@/utils/request'

const baseReflect = '/ReflectInvoke/Invoke?assebleUrlEn=GDYZCBusiness.dll&classUrlEn=GDYZCBusiness.HCProject.Project&functionUrlEn='
    // 登录
export function login(user, pwd) {
    const str = btoa(`${user}:${pwd}`);
    return request({
        url: '/login',
        method: 'post',
        headers: {
            'Authorization': `Basic ${str}`
        }
    })
}

// 获取阶段项目信息 GetSubProjects
export function GetSubProjects(data) {
    return request({
        url: '/Project/GetSubProjects',
        method: 'get',
        data
    })
}

// 获取地区信息 GetLocations
export function GetLocations(data) {
    return request({
        url: `${baseReflect}GetLocations`,
        method: 'post',
        data
    })
}

// 获取编号 GetSerialNumber
export function GetSerialNumber(data) {
    return request({
        url: `${baseReflect}GetSerialNumber`,
        method: 'post',
        data
    })
}

// 获取基本情况调查表(基础列) GetBaseTablesBaseAttrs
export function GetBaseTablesBaseAttrs(data) {
    return request({
        url: `${baseReflect}GetBaseTablesBaseAttrs`,
        method: 'post',
        data
    })
}

// 添加基本情况调查表（基础数据列） AddBaseTablesBaseAttrs
export function AddBaseTablesBaseAttrs(data) {
    return request({
        url: `${baseReflect}AddBaseTablesBaseAttrs`,
        method: 'post',
        data
    })
}

// 获取基本情况调查表中数据项列表 GetJBQKDCBItems
export function GetJBQKDCBItems(data) {
    return request({
        url: `${baseReflect}GetJBQKDCBItems`,
        method: 'post',
        data
    })
}