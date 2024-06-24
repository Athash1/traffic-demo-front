<script setup lang="ts">
import { langType } from '@/enum/options'
import { useLangStore } from '@/stores/modules/vueI18n'
import { computed, getCurrentInstance, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const store = useLangStore()
// Create a responsive computed property to dynamically access the enumerated values
const currentLanguageLabel = computed(() => {
  const currentKey = store.language as keyof typeof langType;
  return langType[currentKey];  // Returns the display name for the corresponding language in the enumeration
});
const { proxy } = getCurrentInstance() as any
const handleCommand = (value: keyof typeof langType) => {
  if (store.language === value) return
  console.log(value)
  proxy.$i18n.locale = value
  store.changeLang(value)
  ElMessage.closeAll()
  ElMessage.success(t('message.languageChanged'))
}
</script>

<template>
  <el-dropdown @command="handleCommand" class="lang-warp">
    <span class="el-dropdown-link">
      {{ currentLanguageLabel }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="ja">日本語</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>
