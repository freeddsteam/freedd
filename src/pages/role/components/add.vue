<template>
  <div>
    <el-dialog :visible.sync="info.isshow" :title="info.isadd?'添加角色':'修改角色'">
      {{ user }}
      <el-form :model="user" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="user.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          >
          </el-tree>
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
          <el-button type="primary" @click="add" v-if="info.isadd">添加</el-button>
          <el-button type="primary" @click="update" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { successalert } from "../../../utils/alert";
import { reqMenulist, reqRoleAdd ,reqRoleOne,reqRoleUpdate,reqRoleDetail} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      value: true,
      user: {
        rolename: "",
        menus: "",
        status: 1,
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
    getOne(id){
        reqRoleDetail({id:id}).then(res=>{
            if(res.data.code==200){
                this.user=res.data.list
                this.user.id=id
                this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus))

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
        rolename: "",
        menus: [],
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([])
    },
    update(){
      this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.user).then(res=>{
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