<template>
  <div class="form">
    <el-dialog
      :visible.sync="info.isshow"
      :title="info.isadd ? '商品分类添加' : '商品分类修改'"
    >
      {{ user }}
      <el-form :model="user" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="user.pid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="user.catename" placeholder="请输入内容"></el-input>
        </el-form-item>
       <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <!-- 一、原生js的上传文件 -->
          <!-- <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>-->

          <!-- 二、element-ui上传文件 -->

          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
  
} from "../../../utils/http";
import {mapActions,mapGetters} from "vuex"
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list:"cate/list"
    })
  },
  data() {
    return {
      imgUrl:"",
      value: true,
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      
    };
  },
  mounted() {
    
    
    
  },
  methods: {
    ...mapActions({
      reqList:"cate/reqList"
    }),
    changeImg2(e){
      let file=e.raw
      this.imgUrl=URL.createObjectURL(file)
      this.user.img=file
    },
    
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.imgUrl="";
      this.user = {
        pid: "",
        catename: "",
        img:null,
        status: 1,
      };
    },
    add() {
      reqCateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqCateDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl=this.$pre+this.user.img
        }
      });
    },
    update() {
     
      reqCateUpdate(this.user).then((res) => {
        
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>