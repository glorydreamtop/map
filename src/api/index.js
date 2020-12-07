import request from '@/utils/request'
import Axios from 'axios';
import { getToken } from '@/utils/cookie';

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

// 获取资料管理目录结构 GetFolders
export function GetFolders(data) {
    return request({
        url: `${baseReflect}GetFolders`,
        method: 'post',
        data
    })
}

// 获取目录下文件 GetDocsByFolderId
export function GetDocsByFolderId(data) {
    return request({
        url: `${baseReflect}GetDocsByFolderId`,
        method: 'post',
        data
    })
}

// 获取文件地址 GetDocumentByDocNo
export function GetDocumentByDocNo(data) {
    return request({
        url: `${baseReflect}GetDocumentByDocNo`,
        method: 'post',
        data
    })
}

// 把WORD或EXCEL转成PDF并返回地址 getWordOrExcelToPDF
export function GetWordOrExcelToPDF(data) {
    return request({
        url: `${baseReflect}getWordOrExcelToPDF`,
        method: 'post',
        data
    })
}

// 获取上传文件类型 GetUploadFileType
export function GetUploadFileType(data) {
    return request({
        url: `${baseReflect}GetUploadFileType`,
        method: 'post',
        data
    })
}

// 添加文件信息 GetCreateDocId
export function GetCreateDocId(data) {
    return request({
        url: `${baseReflect}GetCreateDocId`,
        method: 'post',
        data
    })
}

// 上传文件 UploadDocFile
export function UploadDocFile(data) {
    console.log(data);
    const itemno = data.itemno;
    let file = data.file;
    const formdata = new FormData();
    formdata.append('upFiles_1', file, file.name)
    console.log(formdata);
    return Axios({
        url: `http://aglostech1.yicp.io:9080/Document/UploadDocFile?itemno=${itemno}`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token': getToken()
        },
        data: formdata
    })
}

// 更新文件信息 GetUpdateDocId
export function GetUpdateDocId(data) {
    return request({
        url: `${baseReflect}GetUpdateDocId`,
        method: 'post',
        data
    })
}

// 删除文件 DelDoc
export function DelDoc(data) {
    return request({
        url: `${baseReflect}DelDoc`,
        method: 'post',
        data
    })
}

// 删除文件 GetQuotaTree
export function GetQuotaTree(data) {
    return request({
        url: `${baseReflect}GetQuotaTree`,
        method: 'post',
        data
    })
}