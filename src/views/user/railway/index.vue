<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useI18n } from 'vue-i18n' // 导入 useI18n 函数
import { useAuthStore } from '@/stores/modules/authStore'
import type { Railway } from '@/types/railway'
import type { Ref } from '@vue/runtime-dom'

const { t, locale } = useI18n() // 使用 useI18n 函数

interface PageResult {
  total: number
  records: Railway[]
}

const pageResult: Ref<PageResult> = ref({ total: 0, records: [] })
const currentPage = ref(1)
const pageSize = ref(10)
const name = ref('')
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string
const authStore = useAuthStore()
const token = authStore.token

const fetchPageRailway = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/user/api/pageRailway`, {
      headers: {
        authentication: `${token}`
      },
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        name: name.value
      }
    })
    console.log(response.data.data.records) // 打印从后端获取的数据

    // 先将 response.data.data 赋值给 pageResult.value
    pageResult.value = response.data.data

    // 然后处理 records
    pageResult.value.records = pageResult.value.records.map((record: Railway) => ({
      ...record,
      railwayTitle: record['odpt:railwayTitle'][locale.value], // 使用 'odpt:railwayTitle' 的 'ja' 或 'en' 属性作为 railwayTitle
    }))

    console.log(pageResult.value) // 打印处理后的数据
  } catch (error) {
    ElMessage.error('Error fetching railways')
  }
}

const getTrainInformation = async (sameAs: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/user/api/getTrainInformation`, {
      headers: {
        authentication: `${token}`
      },
      params: {
        sameAs: sameAs
      }
    })
    console.log(response.data) // 打印从后端获取的数据
    ElMessage.success(response.data[locale.value] || t('message.noInformationAvailable')) // 显示列车的运行信息，如果没有信息，显示 'No information available'
  } catch (error) {
    ElMessage.error('Error fetching train information')
  }
}


const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchPageRailway()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchPageRailway()
}

fetchPageRailway()
</script>

<template>
  <div>
    <el-input v-model="name" placeholder="Search by name" @change="fetchPageRailway"></el-input>
    <el-button type="primary" @click="fetchPageRailway">Search</el-button>
  </div>
  <div>
    <el-table :data="pageResult.records" style="width: 100%">
      <el-table-column label="Name">
        <template #default="scope">
          {{ scope.row['odpt:railwayTitle'] && (locale === 'ja' || locale === 'en') && scope.row['odpt:railwayTitle'][locale] }}
        </template>
      </el-table-column>

      <!-- 操作列，包含按钮 -->
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="primary" @click="getTrainInformation(scope.row['owl:sameAs'])">Get Train Information</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageResult.total">
    </el-pagination>
  </div>
</template>

<style scoped>

</style>