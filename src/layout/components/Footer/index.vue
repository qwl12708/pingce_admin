<template>
  <footer v-if="true">
    <a :href="href" :target="target">{{ context }}</a>
  </footer>
</template>

<script lang="ts" setup name="Footer">
import { reactive, toRefs } from 'vue'
const initData = reactive({
  target: '_blank',
  context: 'Vue ElementPlus Admin'
})
const { href, target, context } = toRefs(initData)
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  a {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    text-decoration: none;
  }
}
</style>
