<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import axios from 'axios';
import type { genderCountVO } from '@/types/genderCountVO';
import { useAuthStore } from '@/stores/modules/authStore';
import { useI18n} from 'vue-i18n';

const { t } = useI18n();
const authStore = useAuthStore();
const token = authStore.token;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;
const gender = computed(() => t('accountManagement.sex'))
const male = computed(() => t('accountManagement.male'))
const female = computed(() => t('accountManagement.female'))

let genderData = ref<genderCountVO[]>([]);

const fetchData = async () => {
  const response = await axios.get(`${apiBaseUrl}/admin/static/gender`, {
    headers: {
      token: token,
    },
  });

  if (response.data.code === 200) {
    genderData.value = response.data.data;
  } else {
    console.error('Failed to fetch data');
  }
};

fetchData();

</script>

<template>
  <el-table :data="genderData" style="width: 100%">
    <el-table-column :label="gender">
      <template #default="{ row }">
        {{ t('accountManagement.' + row.gender.toLowerCase()) }}
      </template>
    </el-table-column>
    <el-table-column prop="count" label="Count"></el-table-column>
  </el-table>
</template>

<style scoped>

</style>