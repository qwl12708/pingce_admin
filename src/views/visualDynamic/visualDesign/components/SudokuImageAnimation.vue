<template>
  <div style="width: 100%">
    <div class="container">
      <div class="content">
        <div v-for="(_, index) in list" :key="index" :class="`item${index}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = new Array(9).fill(0)
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;

  $itemWidth: 80px;
  $gap: 10px;

  .content {
    $width: calc($itemWidth * 3 + $gap * 2);
    width: $width;
    height: $width;
    display: grid;
    grid-template-columns: repeat(3, $itemWidth);
    grid-template-rows: repeat(3, $itemWidth);
    gap: $gap;
    place-content: center;
    transition: all 0.3s;

    $spanWidth: 4px;
    $spanNum: 9;

    .item {
      width: $itemWidth;
      height: $itemWidth;
      border: 1px solid;
      border-image: linear-gradient(45deg, #293a53, #7cb1c5) 1;
      background-image: url('@/assets/image/flower.jpg');
      background-size: calc($itemWidth * 3) calc($itemWidth * 3);
    }

    @for $i from 0 to $spanNum {
      .item#{$i} {
        @extend .item;
        $xIndex: $i % 3;
        $yIndex: floor(calc($i / 3));
        background-position: calc($xIndex * (-100%)) calc($yIndex * (-100%));
      }
    }

    &:hover {
      gap: 0;
      filter: drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.6));

      .item {
        border: none;
      }
    }
  }
}
</style>
