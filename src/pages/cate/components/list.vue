<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="分类编号" width="180"> </el-table-column>
    <el-table-column prop="catename" label="分类名称" width="180">
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <img
          v-if="scope.row.img !== 'null'"
          :src="$pre + scope.row.img"
          alt=""
        />
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
import { reqCateDel, reqManageDel } from "../../../utils/http";
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
     
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    del(id){
      reqCateDel({id:id}).then(res=>{
        if(res.data.code==200){
          
          successalert(res.data.msg)
          this.reqList()
        }
      })
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