<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/modules/authStore'
import type { Auth } from '@/types/auth'
import router from '@/router'
import { ElMessage } from 'element-plus'

const loading = ref<boolean>(false);

const baseURL = import.meta.env.VITE_API_BASE_URL;

const loginForm = ref({
  username: 'user',
  password: '123456789'
});

const authStore = useAuthStore();

async function handleLogin() {
  try {
    loading.value = true;
    const response = await axios.post<{code: number; msg: string; data: any}>(`${baseURL}/user/user/login`, {
      username: loginForm.value.username,
      password: loginForm.value.password
    });
    if (response.data.code == 200) {
      authStore.userLogin(response.data.data.token, response.data.data)
      ElMessage.success('Login successfully.');
      await router.push('/user/railway')
    } else {
      ElMessage.error('Wrong username or password');
    }
  } catch (error: any) {
    console.error('Login failed:', error);
    ElMessage.error('Login failed:', error.message);
  }
}

async function goToAdminLogin() {
  await router.push('/admin/login')
}
</script>

<template>
  <div class="login">
    <el-card class="login-card">
      <template #header>
        <div class="container">
          <div style="margin-left: 5px">
            <span>User Login</span>
          </div>
        </div>
      </template>
      <el-form>
        <el-form-item label="Username">
          <el-input v-model="loginForm.username" type="text" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" show-password placeholder="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-loading="loading" @click="handleLogin">Log in</el-button>
          <el-button type="default" @click="goToAdminLogin">Switch to Admin Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/image/background.svg");
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
}
.login-card{
  position: absolute;
  left: 40%;
  top: 40%;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.8);
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>