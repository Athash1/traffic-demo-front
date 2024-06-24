<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/modules/authStore';

const authStore = useAuthStore();
const token = authStore.token;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

let totalServiceUsageForMonth = ref<number>(0);

const fetchData = async () => {
  const response = await axios.get(`${apiBaseUrl}/admin/static/usageStatsMonth`, {
    headers: {
      token: token,
    },
  });

  if (response.data.code === 200) {
    totalServiceUsageForMonth.value = response.data.data;
  } else {
    console.error('Failed to fetch data');
  }
};

fetchData();
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t('dashboard.monthService') }}</span>
        </div>
      </template>
      <h2 class="secondary-text">{{ totalServiceUsageForMonth }}</h2>
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  margin: 20px;
}

.secondary-text {
  color: #606266; /* 这是 Element Plus 的 secondary 文本颜色 */
}
</style>