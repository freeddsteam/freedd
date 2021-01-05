<template>
  <div>
     
      <v-list :list="list" @edit="edit($event)" ></v-list>
      <v-add :info="info" ref="idd" @init="init" ></v-add>
  </div>
</template>

<script>
import vList from './components/list'
import vAdd from "./components/add"
import {reqmemberList} from "../../utils/http"
import { successalert } from '../../utils/alert'
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
            this.info.isshow=true
            this.info.isadd=true
        },
        init(){
            reqmemberList().then(res=>{
                if(res.data.code==200){
                    this.list=res.data.list
                }

            })

        },
        edit(id){
            this.info.isshow=true
            this.info.isadd=false
            this.$refs.idd.getOne(id)

        
        }
       
    },
    mounted(){
        this.init();
    }


}
</script>

<style >

</style>