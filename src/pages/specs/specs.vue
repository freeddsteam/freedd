<template>
  <div>
    <div class="aa1">
      <el-button type="primary" @click="willAdd">添加</el-button>
    </div>
    <v-list @edit="edit($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqManageList, reqManageCount } from "../../utils/http";
import { successalert } from "../../utils/alert";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },   
  },
  mounted() {},
};
</script>

<style scoped>
.aa1 {
  margin-top: 30px;
}
</style>