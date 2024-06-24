<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router';
import type { RouteLocationMatched } from  'vue-router';
import router from '@/router'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const breadcrumbList = computed(() => route.matched.filter((item) => item.meta.title));
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item;
  redirect ? router.push(redirect as string) : router.push(path);
};
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <a @click.prevent="handleLink(item)" class="!font-normal"> {{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>