<template>
  <div>
    <el-dialog
      :visible.sync="info.isshow"
      :title="info.isadd ? '用户添加' : '用户修改'"
    >
      {{ user }}
      <el-form :model="user" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="user.roleid">
            <el-option label="--请选择--" value=""></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
        <el-input v-model="user.username" placeholder="请输入内容"></el-input>
        </el-form-item>
         <el-form-item label="密码">
        <el-input v-model="user.password" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="add" v-if="info.isadd"
            >添加</el-button
          >
          <el-button type="primary" @click="update" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import {
  reqManageAdd,
  reqManageDetail,
  reqMenulist,
  reqRoleList,
  reqRoleAdd,
  reqRoleOne,
  reqRoleUpdate,
  reqRoleDetail,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      value: true,
      user: {
        roleid: 0,
        username: "",
        password:"",
        status:1
      },
      roleList:[],

      

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
  methods: {
  
    
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        roleid: 0,
        username: "",
        password:"",
        status:1
      };
      
    },
    add(){
      console.log(this.user)
      reqManageAdd(this.user).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg)
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      })
    },
    getOne(id){
      reqManageDetail({uid:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          this.user.password=""
        }
      })
    },
    update() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>