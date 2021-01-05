<template>
  <div>
    <el-container>
      <el-aside width="200px" class="aa1">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
           
            <el-menu-item index="/role">角色管理</el-menu-item>
             <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="3-3">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="3-5">轮播图管理</el-menu-item>
            <el-menu-item index="3-6">秒杀活动</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="aa2">Header</el-header>
        <el-main class="aa3">
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.aa1 {
  background: #20222a;
  color: #fff;
  height: 100vh;
}
.aa2 {
  background: #b3c0d1;
}
.aa3 {
  background: #fff;
}
</style>