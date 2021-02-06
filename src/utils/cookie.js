import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'
const StageKey = 'Stage'

export function getToken() {
    const token = Cookies.get(TokenKey)
    return token;
}

export function setToken(token) {
    return Cookies.set(TokenKey, token,{
        expires:60
    })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function setStage(stage) {
    return Cookies.set(StageKey, stage,{
        expires:60
    })
}

export function getStage() {
    return Cookies.get(StageKey)
}

export function removeStage() {
    return Cookies.remove(StageKey)
}