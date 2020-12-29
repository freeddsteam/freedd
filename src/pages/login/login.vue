<template>
  <div>
    <div class="login">
      <div class="con">
        <div class="aa1"><p>登录</p></div>
        <el-input v-model="user.name" placeholder="请输入内容"></el-input>
        <el-input v-model="user.pass" placeholder="请输入内容"></el-input>
        <div class="aa2"><el-button type="primary" @click="login">登录</el-button></div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                name:"",
                pass:""
            }
        }
    },
    methods:{
        login(){
            this.$router.push("/")
        }
    }
};
</script>

<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: #4f3749;
}
.con{
    width: 400px;
    height: 200px;
    background: #ffffff;
    border-radius: 20px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.aa1{
    text-align: center;
}
.aa2{
    text-align: center;
}
</style>