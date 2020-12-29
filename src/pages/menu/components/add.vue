<template>
  <div>
    <el-dialog :visible.sync="info.isshow" @click="cancel">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="user.pid" @change="changepid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="user.type == 1">
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="user.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + '-/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router/index";
import {reqMenuAdd, reqMenulist,reqMenuDetail,reqMenuUpdate} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      radio: "1",
      isshow: false,
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      indexRoutes,
    };
  },
  methods: {
    empty(){
      this.user={
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    cancel() {
      if(!this.info.isadd){
        this.empty()
      }
      this.info.isshow = false;
      
    },
    update() {
      reqMenuUpdate(this.user).then(res=>{
        if(res.data.code==200){
          successalert(res.data.msg)
          this.cancel()
          this.empty()
          this.$emit("init")
        }
      })
    },
    add(){
      reqMenuAdd(this.user).then(res=>{
        if(res.data.code==200){
          console.log(res);
          this.info.isshow=false;
          this.$parent.init()
        }
      })
    },
    getOne(id){
      reqMenuDetail({id:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          this.user.id=id
        }
      })
    },
    changepid(){
      if(this.user.pid==0){
        this.user.type=1
      }else{
        this.user.type=2
      }
    }
    
  },
};
</script>

<style>
</style>