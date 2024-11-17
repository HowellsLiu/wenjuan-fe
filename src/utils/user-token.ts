// 存储以及获取user token
const KEY = 'USER_TOKEN'
export function setTOKEN(token:string) {
    localStorage.setItem(KEY,token)
}
export function getTOKEN(){
    return localStorage.getItem(KEY)||''
}
export function removeTOKEN(){
    localStorage.removeItem(KEY)
}