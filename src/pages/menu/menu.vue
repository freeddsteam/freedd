<template>
  <div>
      <div class="aa1"><el-button type="primary" @click="willAdd">添加</el-button></div>
      <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
      <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
      
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from './components/add'
import {reqMenulist} from "../../utils/http"
export default {
    components:{
        vList,
        vAdd
    },
    data(){
        return{
            info:{
                isshow:false,
                isadd:true
            },
            list:[]
        }
    },
    methods:{
        willAdd(){
            this.info.isshow=true,
            this.info.isadd=true
        },
        init(){
            reqMenulist().then(res=>{
                console.log(res);
                if(res.data.code==200){
                    this.list=res.data.list;
                    
                }
            })
        },
        edit(id){
            this.info.isshow=true
            this.info.isadd=false
            this.$refs.add.getOne(id)
        },
    },
    mounted(){
        this.init();
    }
}
</script>

<style scoped>
.aa1{
    margin-top: 30px;
}
</style>