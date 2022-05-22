<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="40" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户ID</el-dropdown-item>
        <el-dropdown-item divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RouteRecord } from 'vue-router'

export default Vue.extend({
  name: 'AppHeader',
  data() {
    return {
      breadcrumbList: [] as RouteRecord[]
    }
  },
  watch: {
    $route: function () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb(): void {
      const matched: RouteRecord[] = this.$route.matched
      this.breadcrumbList = matched.filter((route: RouteRecord) => {
        return route.path !== '' && route.path !== '/'
      })
    }
  },
  created() {
    this.getBreadcrumb()
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>

function isHome(arg0: RouteRecord) { throw new Error('Function not implemented.') }
