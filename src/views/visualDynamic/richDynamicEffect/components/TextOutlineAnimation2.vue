<template>
  <div style="width: 100%">
    <div class="container">
      <ModuleTitle title="文字线条循环动效" />
      <div class="content">
        <svg>
          <symbol id="text">
            <text text-anchor="middle" x="50%" y="80%">SVG</text>
          </symbol>
          <use xlink:href="#text" class="text"></use>
          <use xlink:href="#text" class="text"></use>
          <use xlink:href="#text" class="text"></use>
          <use xlink:href="#text" class="text"></use>
          <use xlink:href="#text" class="text"></use>
        </svg>
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
  height: 380px;
  display: flex;
  justify-content: center;
  position: relative;

  $color1: #b80c09;
  $color2: #fffc31;
  $color3: #d5f2e3;
  $color4: #03f7eb;
  $color5: #b91372;
  $animationTime: 6s;
  $dottedLineLength: 60;
  $dottedLineSpace: 300;
  $delaySpace: -1.2s;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 210px;

    svg {
      width: 400px;
      height: 260px;
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        fill: none;
        stroke: #fff;
        stroke-width: 4px;
        stroke-dasharray: $dottedLineLength $dottedLineSpace;
        animation: stroke $animationTime linear infinite;

        &:nth-of-type(1) {
          stroke: $color1;
        }

        &:nth-of-type(2) {
          stroke: $color2;
          animation-delay: $delaySpace;
        }

        &:nth-of-type(3) {
          stroke: $color3;
          animation-delay: $delaySpace * 2;
        }

        &:nth-of-type(4) {
          stroke: $color4;
          animation-delay: $delaySpace * 3;
        }

        &:nth-of-type(5) {
          stroke: $color5;
          animation-delay: $delaySpace * 4;
        }
      }
    }
  }

  @keyframes stroke {
    to {
      stroke-dashoffset: $dottedLineLength + $dottedLineSpace;
    }
  }
}
</style>
