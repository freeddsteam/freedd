<template>
  <div>
    <div class="aa1">
      <el-button type="primary" @click="willAdd">添加</el-button>
    </div>
    <v-list :list="list" @edit="edit($event)"></v-list>
    <v-add :info="info" ref="idd" @init="init"></v-add>
    <!-- 一、分页
    prev表示上一页，
    next为下一页，
    pager表示页码列表
    total表示总条目数，默认一页10条
    page-size 每一页的数量
    current-change	currentPage 改变时会触发
     -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqManageList,reqManageCount } from "../../utils/http";
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
      pageSize: 2,
      total: 0,
      page: 1,
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      reqManageList({ page:this.page, size:this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.idd.getOne(id);
    },
    getTotal(){
        reqManageCount().then(res=>{
            if(res.data.code==200){
                this.total=res.data.list[0].total
            }
        })
    },
    getList(){
        reqManageList({page:this.page,size:this.pageSize}).then(res=>{
            if(res.data.code==200){
                if(res.data.list.length==0&&this.page>1){
                    this.page--
                    this.getList()
                    return
                }
                this.list=res.data.list
            }

        })
    },
    init(){
        this.getTotal();
        this.getList()
    },
    changePage(e){
        this.page=e
        this.getList()
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.aa1 {
  margin-top: 30px;
}
</style>