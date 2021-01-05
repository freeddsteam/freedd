<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="规格编号" width="180"> </el-table-column>
    <el-table-column prop="specsname" label="规格名称"> </el-table-column>
    <el-table-column prop="attrs" label="规格属性">
      <template slot-scope="scope">
        <el-tag size="small" closable v-for="item in scope.row.attrs" :key="item.index">{{item}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { successalert } from "../../../utils/alert";
import {reqspecsDel } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },

  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),
    del(id) {
      reqspecsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.reqList();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqList();
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>