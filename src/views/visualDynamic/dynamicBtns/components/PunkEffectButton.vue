<template>
  <div class="container">
    <button>Button</button>
  </div>
</template>

<style scoped lang="scss">
@import '../buttonVariables.scss';
.container {
  @mixin btn {
    width: $dynamicButtonsWidth;
    height: $dynamicButtonsHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0 !important;
    background: linear-gradient(30deg, transparent 10%, rgb(255, 136, 0) 10% 95%, rgb(0, 255, 149) 95%);
    box-shadow: 5px 0 0 rgb(0, 204, 255);
    color: rgb(255, 251, 251);
    font-size: 24px;
    cursor: pointer;
  }

  button {
    @include btn;
    position: relative;

    &::after {
      @include btn;
      content: 'Button';
      position: absolute;
      top: 0;
      left: 0;
      text-shadow: -5px -2px 0 rgb(0, 183, 255), 5px 2px 0 rgb(0, 255, 115);
      visibility: hidden;
    }

    &:hover {
      &::after {
        animation: san 1s;
        animation-timing-function: steps(1, end);
      }
    }
  }

  @keyframes san {
    0% {
      clip-path: inset(20% -5px 60% 0);
      transform: translate(-6px, 5px);
      visibility: visible;
    }

    10% {
      clip-path: inset(50% -5px 30% 0);
      transform: translate(6px, -5px);
    }

    20% {
      clip-path: inset(20% -5px 60% 0);
      transform: translate(5px, 0px);
    }

    30% {
      clip-path: inset(80% -5px 5% 0);
      transform: translate(-8px, 5px);
    }

    40% {
      clip-path: inset(0 -5px 80% 0);
      transform: translate(-4px, -3px);
    }

    50% {
      clip-path: inset(50% -5px 30% 0);
      transform: translate(-6px, -5px);
    }

    60% {
      clip-path: inset(80% -5px 5% 0);
      transform: translate(-7px, 5px);
    }

    70% {
      clip-path: inset(0 -5px 80% 0);
      transform: translate(3px, 6px);
    }

    80% {
      clip-path: inset(50% -5px 30% 0);
      transform: translate(5px, 5px);
    }

    90% {
      clip-path: inset(20% -5px 60% 0);
      transform: translate(6px, -5px);
    }

    100% {
      clip-path: inset(0 -5px 80% 0);
      transform: translate(1px, 5px);
    }
  }
}
</style>
