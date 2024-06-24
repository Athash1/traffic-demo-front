<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import logo from './logo.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()
const translatedTitle = computed(() => t('aside.userManagement'));

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-row class="tac">
    <el-col>
      <div class="logo-container">
        <logo ></logo>
      </div>
      <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#409eff"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><DataAnalysis /></el-icon>
            <span>{{ $t('aside.trafficInfo') }}</span>
          </template>
          <el-menu-item index="/user/railway">{{ $t('aside.railwayInfo')}}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style>
  .tac{
    background-color: #409eff;
  }
  .logo-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    background-color: #407eff;
  }
</style>
