<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useAuthStore } from '@/stores/modules/authStore'
import type { User } from '@/types/user'

const pageResult = ref({ total: 0, records: [] })
const currentPage = ref(1)
const pageSize = ref(10)
const name = ref('')
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string
const authStore = useAuthStore()
const token = authStore.token

const fetchPageUser = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/admin/employee/pageUser`, {
      headers: {
        token: `${token}`
      },
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        name: name.value
      }
    })
    pageResult.value = response.data.data
  } catch (error) {
    ElMessage.error('Error fetching users')
  }
}

const deleteUser = async (user: User) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/admin/employee/${user.username}`, {
      headers: {
        token: `${token}`
      }
    })
    if (response.data.code === 200) {
      ElMessage.success('User deleted successfully')
      await fetchPageUser() // Reset the list of users
    } else {
      ElMessage.error('Failed to delete user')
    }
  } catch (error) {
    ElMessage.error('Error deleting user')
  }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchPageUser()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchPageUser()
}

fetchPageUser()
</script>

<template>
  <div>
    <el-input v-model="name" placeholder="Search by name" @change="fetchPageUser"></el-input>
    <el-button type="primary" @click="fetchPageUser">Search</el-button>
  </div>
  <div>
    <el-table :data="pageResult.records" style="width: 100%">
      <!-- Add your columns here -->
      <el-table-column prop="username" label="username"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="phone" label="phone"></el-table-column>
      <el-table-column prop="sex" label="sex"></el-table-column>
      <el-table-column prop="status" label="status">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? 'enable' : 'disable' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="createTime"></el-table-column>
      <el-table-column prop="updateTime" label="updateTime"></el-table-column>
      <el-table-column prop="createUser" label="createUser"></el-table-column>
      <el-table-column prop="updateUser" label="updateUser"></el-table-column>
      <el-table-column prop="totalServiceUsage" label="totalServiceUsage"></el-table-column>
      <!-- Add your columns here -->

      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="danger" @click="deleteUser(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageResult.total">
    </el-pagination>
  </div>
</template>

<style scoped>

</style>