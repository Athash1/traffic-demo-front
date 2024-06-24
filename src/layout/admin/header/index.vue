<script setup lang="ts">
import Breadcrumb from './breadcrumb.vue';
import ChangeLang from '@/components/header/ChangeLang.vue'
import { ref, reactive, toRefs, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/authStore'
import { ElMessage } from 'element-plus'

const router = useRouter();
const authStore = useAuthStore();
const { logout } = authStore;
const { t } = useI18n();

function hadlelogout() {
  logout()
  router.push('/')
  ElMessage.success(t('head.signOutSuccess'))
}

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const { circleUrl } = toRefs(state)


</script>

<template>
  <div class="bread">
    <Breadcrumb></Breadcrumb>
  </div>

  <div class="right">
    <div class="change-lang-container">
      <ChangeLang></ChangeLang>
    </div>
    <div class="avatar-dropdown">
      <el-avatar class="avatar" :size="55" :src="circleUrl" />
      <el-dropdown>
			<span class="el-dropdown-link">
				{{ $t('head.settings') }}
				<el-icon class="el-icon--right">
					<arrow-down />
				</el-icon>
			</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="hadlelogout">{{ $t('head.signOut') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>


<style scoped>
.avatar-dropdown{
  display: flex;
  align-items: center;
}

.change-lang-container{
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar{
  cursor: pointer;
}
.el-dropdown-link{
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.bread{
  display: flex;
  align-items: center;
  height: fit-content;
}

.right {
  display: flex;
  padding-right: 10px;
  width: 150px;
  justify-content: space-between;
  align-items: center;
  float: right;

  .el-icon--right {
    display: none;
  }
}
</style>