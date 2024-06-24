<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage, type FormProps } from 'element-plus'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/modules/authStore'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const employee = reactive({
  username: '',
  name: '',
  phone: '',
  sex: '',
});

const ruleForm = reactive({
  pass: '',
  checkPass: '',
})

const labelPosition = ref<FormProps['labelPosition']>('right')
const { t } = useI18n()
const username = computed(() => t('accountManagement.userName'))
const name = computed(() => t('accountManagement.name'))
const password = computed(() => t('accountManagement.password'))
const confirmPassword = computed(() => t('accountManagement.confirmPassword'))
const phone = computed(() => t('accountManagement.phone'))
const gender = computed(() => t('accountManagement.sex'))
const male = computed(() => t('accountManagement.male'))
const female = computed(() => t('accountManagement.female'))
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string


const authStore = useAuthStore()
const token = authStore.token
const id = authStore.userInfo?.id

const passwordForm = computed(() => ({
  id: id,
  password: ruleForm.pass
}))

/**
 * Fetch employee data from the server by id and set it to the employee object in the reactive state.
 * @param id
 */
const fetchEmployee = async (id: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/admin/employee/${id}`, {
      headers: {
        token: `${token}`,
      },
    });
    Object.assign(employee, response.data.data);
  } catch (error) {
    console.error("Failed to fetch employee", error);
  }
};

/**
 * Update the employee data on the server.
 */
const updateEmployee = async () => {
  try {
    const response = await axios.put(`${apiBaseUrl}/admin/employee`, employee, {
      headers: {
        token: `${token}`,
      },
    });
    if (response.data.code === 200) {
      ElMessage.success('Employee updated successfully');
    } else {
      ElMessage.error('Failed to update employee');
    }
  } catch (error) {
    console.error("Failed to update employee", error);
  }
};

/**
 * Update the password on the server.

 */
const updatePassword = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/admin/employee/password`, passwordForm.value, {
      headers: {
        token: `${token}`,
      },
    });
    if (response.data.code === 200) {
      ElMessage.success('Password updated successfully');
    } else {
      ElMessage.error('Failed to update password');
    }
  } catch (error) {
    console.error("Failed to update password", error);
  }
}

const resetPassword = () => {
  ruleForm.pass = '';
  ruleForm.checkPass = '';
}

/**
 * Update the employee data on the server when the page is loaded.
 */
onMounted(() => {
   if (id) {
    fetchEmployee(id);
   } else {
    ElMessage.error('Failed to fetch employee data')
   }
});

/**
 * Reset the employee object in the reactive state.
 */
const resetEmployee = () => {
  employee.username = '';
  employee.name = '';
  employee.phone = '';
  employee.sex = '';
};

/**
 * Form password validation rules.
 *
 * @param rule
 * @param value
 * @param callback
 */
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}

/**
 * Form check password validation rules.
 *
 * @param rule
 * @param value
 * @param callback
 */
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})
</script>

<template>
    <el-row :gutter="10">
      <el-col :span="12" :xs="24" class="pb-2" >
        <el-card shadow="never" title="info">
          <template #header>
            <div class="card-header">
              <span>{{ $t('accountManagement.modifyInformation') }}</span>
            </div>
          </template>
          <div>
            <el-form
              :label-position="labelPosition"
              label-width="auto"
              :model="employee"
              style="max-width: 600px"
            >
              <el-form-item :label="username">
                <el-input v-model="employee.username" />
              </el-form-item>
              <el-form-item :label="name">
                <el-input v-model="employee.name" />
              </el-form-item>
              <el-form-item :label="phone">
                <el-input v-model="employee.phone" />
              </el-form-item>
              <el-form-item :label="gender">
                <el-select v-model="employee.sex" placeholder="please select your gender">
                  <el-option :label="male" value="Male"></el-option>
                  <el-option :label="female" value="Female"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployee">
                  {{ $t('accountManagement.submit') }}
                </el-button>
                <el-button @click="resetEmployee">{{ $t('accountManagement.reset') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24" class="pb-2">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>{{ $t('accountManagement.changeYourPassword') }}</span>
            </div>
          </template>
          <div>
            <el-form
              ref="ruleFormRef"
              style="max-width: 600px"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="auto"
              class="demo-ruleForm"
            >
              <el-form-item :label="password" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item :label="confirmPassword" prop="checkPass">
                <el-input
                  v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updatePassword">
                  {{ $t('accountManagement.submit') }}
                </el-button>
                <el-button @click="resetPassword">{{ $t('accountManagement.reset') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<style scoped>

</style>