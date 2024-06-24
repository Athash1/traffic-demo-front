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
            <span>{{ $t('aside.dashboard') }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/dashboard/totalAdd">{{ $t('aside.navigatorTotalAdd')}}</el-menu-item>
            <el-menu-item index="/admin/dashboard/totalService">{{ $t('aside.navigatorTotalService')}}</el-menu-item>
            <el-menu-item index="/admin/dashboard/gender">{{ $t('aside.navigatorGender')}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/admin/dashboard/monthAdd">{{ $t('aside.navigatorMonthAdd')}}</el-menu-item>
            <el-menu-item index="/admin/dashboard/monthService">{{ $t('aside.navigatorMonthService')}}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="/admin/userManagement">
          <el-icon><document /></el-icon>
          <span>{{ $t('aside.userManagement') }}</span>
        </el-menu-item>
        <el-menu-item index="/admin/accountManagement">
          <el-icon><setting /></el-icon>
          <span>{{ $t('aside.accountManagement') }}</span>
        </el-menu-item>
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
