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

// 修改

export let reqManageUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:user
    })
}

//获取总数

export let reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount"
    })
}

//`````````````````````````商品分类················`````````

function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

export let reqCateAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:dataToFormData(user)
    })
}

export let reqCateList=(user)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:user
    })
}
//详情
export let reqCateDetail=(user)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:user
    })
}
//修改
export let reqCateUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:dataToFormData(user)
    })
}
//删除
export let reqCateDel=(user)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:user
    })
}

//````````````````````商品规格管理1····················
//添加
export let reqspecsAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:user
    })
}
// 列表
export let reqspecsList=(user)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:user
    })
}
//详情
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,specsname:""}
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: user
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data:user
    })
}

//总数
export let reqspecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}
//`````````````````````会员管理`````````````````````
//列表
export let reqmemberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get",
        

    })
}
//详情
export let reqmemberDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:uid
    })
}
//修改
export let reqmemberUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:user
    })
}