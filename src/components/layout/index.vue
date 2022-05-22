<template>
  <el-container>
    <el-aside width="200px">
      <app-side></app-side>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppSide from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  components: {
    AppSide,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh; //将布局容器高度整体撑开
}

.el-aside {
  position: sticky;
  top: 0;
  max-height: 100vh;
  background: #d3dce6;
}

.el-header {
  background: #f8f9fb;
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
