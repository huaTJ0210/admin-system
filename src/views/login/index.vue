<template>
  <div class="login">
    <el-form class="login-form" label-position="top" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex', // 设置组件的name便于在vue的开发工具中进行调试
  data() {
    // 自定义校验规则
    const checkPassword = (rule: any, value: string, callback: any) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      if (value.length < 6 || value.length > 12) {
        callback(new Error('长度在 6 到 12 个字符'))
      } else {
        callback()
      }
    }
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      },
      isLoginLoading: false
    }
  },

  methods: {
    ...mapMutations(['setUser']),
    async onSubmit() {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate()
        // 登录按钮 loading
        this.isLoginLoading = true
        // 2. 验证通过 -> 提交表单
        const { data } = await login(this.form)
        // 3. 处理请求结果
        if (data.state !== 1) {
          //    失败：给出提示
          this.$message.error(data.message)
        } else {
          // 1. 登录成功，记录登录状态，状态需要能够全局访问（放到 Vuex 容器中）
          // this.$store.commit('setUser', data.content)
          this.setUser(data.content)
          // 2. 然后在访问需要登录的页面的时候判断有没有登录状态（路由拦截器）
          //    成功：跳转回原来页面或首页
          this.$router.push((this.$route.query.redirect as string) || '/')
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err) // 表单验证失败的异常
      }

      // 结束登录按钮的 loading
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
