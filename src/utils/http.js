import axios from "axios"

import Vue from "vue"

let baseUrl="/api"
Vue.prototype.$pre="http://localhost:3000"

// 拦截
import {erroralert} from "./alert"
axios.interceptors.response.use(res => {
    
    //18.统一处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    //统一处理list是null的情况
    if(!res.data.list){
        res.data.list=[]
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

//列表
export let reqMenulist=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        params:{
            istree:true
        }
    })
}


//添加
export const reqMenuAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:user

    })
}

//删除
export let reqMenuDel =(obj)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:obj
    })
}

export let reqMenuDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        params:obj
    })
}

//修改接口
export let reqMenuUpdate=(user)=>{
    return axios({
        url:baseUrl+ "/api/menuedit",
        method:"post",
        data:user
    })
}

// ```````````````````````````````````````````````````
// 添加
export let reqRoleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:user
    })
}

export let reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get"
        
    })
}

export let reqRoleDel=(user)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:user
    })
}

//获取一条信息
export let reqRoleOne=(user)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:user
    })
}
//修改
export let reqRoleUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:user
    })
}

//详情

export let reqRoleDetail=(user)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:user
    })
}

//``````````````````````````管理员管理``````````````````````````
export let reqManageAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:user
    })
}

// 列表
export let reqManageList=(user)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:user
    })
}

//删除
export let reqManageDel=(user)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:user
    })
}

//详情

export let reqManageDetail=(user)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:user
    })
}