<script setup lang="ts">
import Aside from '@/layout/user/aside/index.vue'
import Header from '@/layout/user/header/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="aside">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header></Header>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
.aside{
  height: 100vh;
  background-color: #409eff;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  padding-left: 0;
  padding-right: 0;
  box-shadow: 0 0 1px #888;
  background-color: #fff;
  border-bottom: 1px solid #c9c6c6;
}
.main{
  display: flex;
  background-color: #fff;
  flex: 1;
}
</style>