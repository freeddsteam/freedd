<template>
  <div>
    <el-dialog :visible.sync="info.isshow" >
      {{ user }}
      <el-form :model="user" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
         <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
         <el-input v-model="user.password"></el-input>
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
          
          <el-button type="primary" @click="update">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { successalert } from "../../../utils/alert";
import { reqMenulist, reqRoleAdd ,reqRoleOne,reqmemberUpdate,reqmemberDetail} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      value: true,
      user: {
        nickname: "",
        phone: "",
        uid: "",
      },

      list: [],

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    reqMenulist().then((res) => {
      if (res.data.code == 200) {
        this.list = res.data.list;
      }
    });
  },
  methods: {
    getOne(uid){
        reqmemberDetail({uid:uid}).then(res=>{
            if(res.data.code==200){
                this.user=res.data.list
                this.user.password=""

            }
        })

    },
    add() {
      this.user.menus = this.$refs.tree.getCheckedKeys();
      console.log(this.user);
      reqRoleAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert("添加成功");
          this.cancel()
          this.empty();
          
          this.$parent.init();

        }
      });
    },
    cancel() {
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        nickname: "",
       phone: "",
        password: "",
      };
      
    },
    update(){
      
      reqmemberUpdate(this.user).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg)
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      })
    },
    
  },
};
</script>

<style>
</style>