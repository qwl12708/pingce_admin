<template>
  <div class="header-logo flx-center">
    <img v-if="logo" :src="logo" class="sidebar-logo" />
    <h1 class="sidebar-title" v-if="!isShowTitle">
      {{ title }}
    </h1>
  </div>
</template>

<script lang="ts" setup name="Logo">
import { reactive, toRefs, computed } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
import LOGO from '../../../assets/image/logo.png'
console.log('LOGO', LOGO)
const globalStore = useGlobalStore()
const initData = reactive({
  // title: 'LOGO',
  logo: LOGO
})
const { title, logo } = toRefs(initData)
const isShowTitle = computed(() => {
  return globalStore.layout === 'vertical' && globalStore.isCollapse
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.header-logo {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  max-width: $sideBarWidth;
  height: 100%;
  padding: 0 16px;
  .sidebar-logo {
    margin: 12px 0;
    vertical-align: middle;
  }
  .sidebar-title {
    display: inline-block;
    flex: 1;
    padding-left: 12px;
    margin: 0;
    overflow: hidden;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 50px;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
}
</style>
