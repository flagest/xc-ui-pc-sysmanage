import http from './../../../base/api/public'
import querystring from 'queryString'

let sysConfig = require('@/../config/sysConfig')
let appUrl = sysConfig.xcApiUrlPre
//页面查询
export const page_list = (page, size, params) => {
//将param对象数据拼接为key/value串
  let queryString = querystring.stringify(params);
  //请求后端接口
  return http.requestQuickGet(appUrl + '/cms/page/list/' + page + '/' + size + "?" + queryString)

}
//新增课程管理页面的接口地址
export const page_add = (params) => {
  return http.requestPost(appUrl + '/cms/page/add', params)
}
//更具id去查询
export const page_get=(id)=>{
return http.requestGet(appUrl+'/cms/page/get/'+id)
}
//更具id去编辑页面
export const page_edit=(id,params)=>{
  return http.requestPut(appUrl+'/cms/page/edit/'+id,params)
}
//更具页面id去删除
export const page_delete=(id)=>{
  return http.requestDelete(appUrl+'/cms/page/delete/'+id)

}


