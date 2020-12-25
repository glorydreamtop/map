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

// 获取定额树结构 GetQuotaTree
export function GetQuotaTree(data) {
    return request({
        url: `${baseReflect}GetQuotaTree`,
        method: 'post',
        data
    })
}

// 获取定额设置行政编码 GetQuotas
export function GetQuotas(data) {
    return request({
        url: `${baseReflect}GetQuotas`,
        method: 'post',
        data
    })
}

// 获取相关类别的补偿标准列表 GetQuotaClassifyList
export function GetQuotaClassifyList(data) {
    return request({
        url: `${baseReflect}GetQuotaClassifyList`,
        method: 'post',
        data
    })
}

// 添加补偿标准列表中数据项 AddQuota
export function AddQuota(data) {
    return request({
        url: `${baseReflect}AddQuota`,
        method: 'post',
        data
    })
}

// 更改补偿标准列表中数据项 EditQuota
export function EditQuota(data) {
    return request({
        url: `${baseReflect}EditQuota`,
        method: 'post',
        data
    })
}

// 删除补偿标准列表中数据 DeleteQuota
export function DeleteQuota(data) {
    return request({
        url: `${baseReflect}DeleteQuota`,
        method: 'post',
        data
    })
}

// 获取定额标准详细条目信息列表 GetQuotaItemList
export function GetQuotaItemList(data) {
    return request({
        url: `${baseReflect}GetQuotaItemList`,
        method: 'post',
        data
    })
}

// 添加定额标准详细条目信息 AddQuotaItem
export function AddQuotaItem(data) {
    return request({
        url: `${baseReflect}AddQuotaItem`,
        method: 'post',
        data
    })
}

// 更改定额标准详细条目信息 EditQuotaItem
export function EditQuotaItem(data) {
    return request({
        url: `${baseReflect}EditQuotaItem`,
        method: 'post',
        data
    })
}

// 删除定额标准详细条目 DeleteQuotaItem
export function DeleteQuotaItem(data) {
    return request({
        url: `${baseReflect}DeleteQuotaItem`,
        method: 'post',
        data
    })
}
// 获取数据字典树结构 GetDict
export function GetDict(data) {
    return request({
        url: `${baseReflect}GetDict`,
        method: 'post',
        data
    })
}
// 添加数据字典项(左侧树节点) AddDict
export function AddDict(data) {
    return request({
        url: `${baseReflect}AddDict`,
        method: 'post',
        data
    })
}
// 更新数据字典项(左侧树节点) EditDict
export function EditDict(data) {
    return request({
        url: `${baseReflect}EditDict`,
        method: 'post',
        data
    })
}
// 删除数据字典项(数据字典中的删除都用这个接口) DelDict
export function DelDict(data) {
    return request({
        url: `${baseReflect}DelDict`,
        method: 'post',
        data
    })
}
// 添加数据字典详细条目信息 AddDictItem
export function GetDiAddDictItemct(data) {
    return request({
        url: `${baseReflect}AddDictItem`,
        method: 'post',
        data
    })
}
// 修改数据字典详细条目信息 EditDictItem
export function EditDictItem(data) {
    return request({
        url: `${baseReflect}EditDictItem`,
        method: 'post',
        data
    })
}

// 添加数据字典详细条目信息 AddDictItem
export function AddDictItem(data) {
    return request({
        url: `${baseReflect}AddDictItem`,
        method: 'post',
        data
    })
}

// 删除数据字典详细条目信息 DelDictItem
export function DelDictItem(data) {
    return request({
        url: `${baseReflect}DelDictItem`,
        method: 'post',
        data
    })
}
//获取数据字典右侧详细条目树结构 GetDictItems
export function GetDictItems(data) {
    return request({
        url: `${baseReflect}GetDictItems`,
        method: 'post',
        data
    })
}

//获取农专项设施基础信息 GetNCZXSS_BASE
export function GetNCZXSS_BASE(data) {
    return request({
        url: `${baseReflect}GetNCZXSS_BASE`,
        method: 'post',
        data
    })
}
//添加农专项设施基础信息 AddNCZXSS_BASE
export function AddNCZXSS_BASE(data) {
    return request({
        url: `${baseReflect}AddNCZXSS_BASE`,
        method: 'post',
        data
    })
}
//修改农专项设施基础信息 EditNCZXSS_BASE
export function EditNCZXSS_BASE(data) {
    return request({
        url: `${baseReflect}EditNCZXSS_BASE`,
        method: 'post',
        data
    })
}
//删除农专项设施基础信息 DelNCZXSS_BASE
export function DelNCZXSS_BASE(data) {
    return request({
        url: `${baseReflect}DelNCZXSS_BASE`,
        method: 'post',
        data
    })
}
//获取主表下子项列表 GetNCZXSS_SUBS
export function GetNCZXSS_SUBS(data) {
    return request({
        url: `${baseReflect}GetNCZXSS_SUBS`,
        method: 'post',
        data
    })
}
//添加子项 AddNCZXSS_SUB
export function AddNCZXSS_SUB(data) {
    return request({
        url: `${baseReflect}AddNCZXSS_SUB`,
        method: 'post',
        data
    })
}
//修改子项 EditNCZXSS_SUB
export function EditNCZXSS_SUB(data) {
    return request({
        url: `${baseReflect}EditNCZXSS_SUB`,
        method: 'post',
        data
    })
}
//删除子项 DelNCZXSS_SUB
export function DelNCZXSS_SUB(data) {
    return request({
        url: `${baseReflect}DelNCZXSS_SUB`,
        method: 'post',
        data
    })
}
//获取区域的户信息 GetHouseholds
export function GetHouseholds(data) {
    return request({
        url: `${baseReflect}GetHouseholds`,
        method: 'post',
        data
    })
}
//添加户信息 AddHousehold
export function AddHousehold(data) {
    return request({
        url: `${baseReflect}AddHousehold`,
        method: 'post',
        data
    })
}
//修改户信息 EditHousehold
export function EditHousehold(data) {
    return request({
        url: `${baseReflect}EditHousehold`,
        method: 'post',
        data
    })
}
//删除户信息 DelHousehold

export function DelHousehold(data) {
    return request({
        url: `${baseReflect}DelHousehold`,
        method: 'post',
        data
    })
}
//获取区域的地块信息 GetParcels
export function GetParcels(data) {
    return request({
        url: `${baseReflect}GetParcels`,
        method: 'post',
        data
    })
}
//获取种类列表 getHouseClass
export function getHouseClass(data) {
    return request({
        url: `${baseReflect}getHouseClass`,
        method: 'post',
        data
    })
}
//获取类型列表 GetQuotaItemList
export function GetQuotaItemList(data) {
    return request({
        url: `${baseReflect}getHouseClass`,
        method: 'post',
        data
    })
}
//获取户下的子项信息 getHousehold_Subs

export function getHousehold_Subs(data) {
    return request({
        url: `${baseReflect}getHousehold_Subs`,
        method: 'post',
        data
    })
}
//添加户下的子项 AddHousehold_Sub
export function AddHousehold_Sub(data) {
    return request({
        url: `${baseReflect}AddHousehold_Sub`,
        method: 'post',
        data
    })
}
//修改户下的子项 EditHousehold_Sub
export function EditHousehold_Sub(data) {
    return request({
        url: `${baseReflect}EditHousehold_Sub`,
        method: 'post',
        data
    })
}
//删除户下的子项 DelHousehold_Sub
export function DelHousehold_Sub(data) {
    return request({
        url: `${baseReflect}DelHousehold_Sub`,
        method: 'post',
        data
    })
}