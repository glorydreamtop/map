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

// 获取基本情况调查表中数据项列表 GetJBQKDCBItems
export function GetJBQKDCBItems(data) {
    return request({
        url: `${baseReflect}GetJBQKDCBItems`,
        method: 'post',
        data
    })
}

// 获取所有基本情况调查表（基础列） GetAllBaseTablesBaseAttrs
export function GetAllBaseTablesBaseAttrs(data) {
    return request({
        url: `${baseReflect}GetAllBaseTablesBaseAttrs`,
        method: 'post',
        data
    })
}

// 获取基本情况调查表（基础列） GetBaseTablesBaseAttrs
export function GetBaseTablesBaseAttrs(data) {
    return request({
        url: `${baseReflect}GetBaseTablesBaseAttrs`,
        method: 'post',
        data
    })
}

// 获取一个基本情况调查表中数据列集合 GetBaseTablesListAttrs
export function GetBaseTablesListAttrs(data) {
    return request({
        url: `${baseReflect}GetBaseTablesListAttrs`,
        method: 'post',
        data
    })
}

// 添加基本情况调查表（基础列） AddBaseTablesBaseAttrs
export function AddBaseTablesBaseAttrs(data) {
    return request({
        url: `${baseReflect}AddBaseTablesBaseAttrs`,
        method: 'post',
        data
    })
}

// 更新基本情况调查表（基础列） UpdateBaseTablesBaseAttrs
export function UpdateBaseTablesBaseAttrs(data) {
    return request({
        url: `${baseReflect}UpdateBaseTablesBaseAttrs`,
        method: 'post',
        data
    })
}

// 删除基本情况调查表 DeleteBaseTable
export function DeleteBaseTable(data) {
    return request({
        url: `${baseReflect}DeleteBaseTable`,
        method: 'post',
        data
    })
}

// 添加基本情况调查表（数据列） AddBaseTablesListAttrs
export function AddBaseTablesListAttrs(data) {
    return request({
        url: `${baseReflect}AddBaseTablesListAttrs`,
        method: 'post',
        data
    })
}

// 更新基本情况调查表（数据列） UpdateBaseTablesListAttrs
export function UpdateBaseTablesListAttrs(data) {
    return request({
        url: `${baseReflect}UpdateBaseTablesListAttrs`,
        method: 'post',
        data
    })
}

// 删除基本情况调查表下数据列 DeleteBaseTablesAttr
export function DeleteBaseTablesAttr(data) {
    return request({
        url: `${baseReflect}DeleteBaseTablesAttr`,
        method: 'post',
        data
    })
}