<template>
  <div style="width: 100%">
    <div class="container">
      <ModuleTitle title="粽子Loading动效" />
      <div class="content">
        <div class="loadingItem1">
          <svg-icon name="StickyRice" />
        </div>
        <div class="loadingItem2">
          <svg-icon name="RedDates" />
        </div>
        <div class="loadingItem3">
          <svg-icon name="ReedLeaves" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="mix">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
            </filter>
          </defs>
        </svg>
      </div>
      <div class="loadingResult">
        <svg-icon name="Zongzi" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModuleTitle from './ModuleTitle.vue'
</script>

<style scoped lang="scss">
.container {
  height: 600px;
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 180px;
  background-color: #000;
  position: relative;

  $duration: 4.2s;
  $delay: -2s;
  $filter: drop-shadow(0px 0px 8px rgba(252, 233, 124, 0.8));

  @mixin loadingItem {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -30px 0 0 -30px;
    filter: $filter;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    position: relative;
    width: 230px;
    height: 230px;
    animation: rotate $duration $delay infinite, mix $duration $delay infinite;

    .loadingItem1 {
      @include loadingItem;
      animation: itemMove1 $duration $delay infinite;
    }

    .loadingItem2 {
      @include loadingItem;
      animation: itemMove2 $duration $delay infinite;
    }

    .loadingItem3 {
      @include loadingItem;
      animation: itemMove3 $duration $delay infinite;
    }

    @keyframes itemMove1 {
      0%,
      20%,
      100% {
        transform: translate(0, 0) scale(1);
      }

      40% {
        transform: translate(0, -18px) scale(0.7);
      }

      60% {
        transform: translate(0, -85px) scale(0.7);
      }

      80% {
        transform: translate(0, -85px) scale(0.7);
      }
    }

    @keyframes itemMove2 {
      0%,
      20%,
      100% {
        transform: translate(0, 0) scale(1);
      }

      40% {
        transform: translate(-16px, 12px) scale(0.7);
      }

      60% {
        transform: translate(-90px, 65px) scale(0.7);
      }

      80% {
        transform: translate(-90px, 65px) scale(0.7);
      }
    }

    @keyframes itemMove3 {
      0%,
      20%,
      100% {
        transform: translate(0, 0) scale(1);
      }

      40% {
        transform: translate(16px, 12px) scale(0.7);
      }

      60% {
        transform: translate(90px, 65px) scale(0.7);
      }

      80% {
        transform: translate(90px, 65px) scale(0.7);
      }
    }

    @keyframes rotate {
      0%,
      60% {
        transform: rotate(0deg);
      }

      80%,
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes mix {
      0%,
      40% {
        filter: url(#mix);
        opacity: 1;
      }

      8%,
      36% {
        opacity: 0;
      }

      48%,
      80% {
        filter: none;
        opacity: 1;
      }

      100% {
        filter: url(#mix);
        opacity: 1;
      }
    }
  }

  .loadingResult {
    @include loadingItem;
    filter: drop-shadow(0px 0px 8px rgba(252, 233, 124, 0.5));
    animation: show $duration $delay infinite;
  }

  @keyframes show {
    0%,
    48%,
    100% {
      opacity: 0;
      transform: scale(1);
    }

    8%,
    36% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
}
</style>
