<template>
  <el-table :data="list" height="250" border style="width: 100%">
    <el-table-column prop="id" label="用户编号" width="180"> </el-table-column>
    <el-table-column prop="nickname" label="昵称" > </el-table-column>
    <el-table-column prop="phone" label="手机号" >
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
      <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {successalert} from "../../../utils/alert"
import {reqRoleDel} from "../../../utils/http"
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods:{
       
      edit(id){
          this.$emit("edit",id)
      }
  }
};
</script>

<style>
</style>