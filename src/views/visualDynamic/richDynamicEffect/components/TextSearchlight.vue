<template>
  <div style="width: 100%">
    <div class="container">
      <ModuleTitle title="探照灯文字动效" />
      <p data-text="♠ CSS Animation ♣">♠ CSS Animation ♣</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModuleTitle from './ModuleTitle.vue'
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 0 60px;
  background-color: #000;
  position: relative;

  p {
    font-size: 64px;
    font-family: 'SourceHanSansCN-Bold' !important;
    font-weight: 700;
    color: #222;
    position: relative;

    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8));
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      clip-path: ellipse(60px 60px at 0% 50%);
      animation: move 8s ease-in-out infinite;
    }
  }

  @keyframes move {
    50% {
      clip-path: ellipse(60px 60px at 100% 50%);
    }

    100% {
      clip-path: ellipse(60px 60px at 0% 50%);
    }
  }
}
</style>
