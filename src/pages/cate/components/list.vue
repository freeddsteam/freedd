<template>
  <el-table :data="list" height="250" border style="width: 100%">
    <el-table-column prop="id" label="用户编号" width="180">  
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="180">
    </el-table-column>
    <el-table-column prop="rolename" label="所属角色" >
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
      <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="180">
      <template slot-scope="scope" >
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {successalert} from "../../../utils/alert"
import {reqManageDel} from "../../../utils/http"
export default {
  props:["list"],
  data() {
    return {};
  },
  methods:{
       del(id){
        
        this.$confirm("你确定要删除吗？","提示",{
          confirmButtonText:"删除",
          cancelButtonText:"取消",
          type:"waring"
        })
        .then(()=>{
          
          reqManageDel({uid:id}).then(res=>{
            
            if(res.data.code==200){
              successalert(res.data.msg)
              this.$parent.init()
            }
          })
        })
        .catch(()=>{})
      },
      edit(id){
          this.$emit("edit",id)
      }
  }
};
</script>

<style>
</style>