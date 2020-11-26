import request from '@/utils/request'

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
        url: '/ReflectInvoke/Invoke?assebleUrlEn=GDYZCBusiness.dll&classUrlEn=GDYZCBusiness.HCProject.Project&functionUrlEn=GetLocations',
        method: 'post',
        data
    })
}