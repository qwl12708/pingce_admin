<template>
  <div style="width: 100%">
    <div class="container">
      <ModuleTitle title="莫比乌斯环循环条动效" />
      <div class="content">
        <div class="leftTop">
          <div />
        </div>
        <div class="leftBottom">
          <div />
        </div>
        <div class="rightTop">
          <div />
        </div>
        <div class="rightBottom">
          <div />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModuleTitle from './ModuleTitle.vue'
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  position: relative;

  $circleWidth: 154px;
  $borderWidth: 16px;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before,
    &::after {
      content: '';
      width: $circleWidth;
      height: $circleWidth;
      border-radius: 50%;
      border: $borderWidth solid #57606f;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }

    &::after {
      left: -$borderWidth;
    }

    div {
      width: $circleWidth;
      height: $circleWidth;
      position: absolute;
      left: 0;
      clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
      z-index: 2;

      div {
        width: $circleWidth;
        height: $circleWidth;
        box-sizing: border-box;
        border-width: $borderWidth;
        border-style: solid;
        border-color: #ff6b81 #ff6b81 transparent transparent;
        border-radius: 50%;
        transform: rotate(135deg);
        animation: roll 4s linear infinite;
      }
    }

    .leftBottom {
      transform: scale(-1, -1);

      div {
        animation-delay: 3s;
      }
    }

    .rightTop {
      transform: translateX(calc(100% - $borderWidth)) scale(-1, 1);

      div {
        animation-delay: 2s;
      }
    }

    .rightBottom {
      transform: translateX(calc(100% - $borderWidth)) scale(1, -1);

      div {
        animation-delay: 1s;
      }
    }
  }

  @keyframes roll {
    50%,
    100% {
      transform: rotate(495deg);
    }
  }
}
</style>
