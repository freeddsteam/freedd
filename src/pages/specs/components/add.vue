<template>
  <div class="form">
    <el-dialog
      :visible.sync="info.isshow"
      :title="info.isadd ? '商品分类添加' : '商品分类修改'"
    >
      {{ user }}
      <el-form :model="user" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button
              type="primary"
              class="line-btn"
              v-if="index == 0"
              @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button
              type="danger"
              class="line-btn"
              v-else
              @click="delAttr(index)"
              >删除</el-button
            >
          </div>
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
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {
      imgUrl: "",
      value: true,
      user: {
        specsname: "",
        attrs: [],
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),
    changeImg2(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    add() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqspecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqspecsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    update() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqspecsUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrsArr.splice(index, 1);
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

.line {
  display: flex;
}

.line-btn {
  width: auto;
}

.line-ipt {
  flex: 1;
}
</style>