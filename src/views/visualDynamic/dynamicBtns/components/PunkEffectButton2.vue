<template>
  <div class="container">
    <button>Button</button>
  </div>
</template>

<style scoped lang="scss">
@import '../buttonVariables.scss';
.container {
  $move1: inset(50% 50% 50% 50%);
  $move2: inset(31% 0 40% 0);
  $move3: inset(39% 0 15% 0);
  $move4: inset(45% 0 40% 0);
  $move5: inset(45% 0 6% 0);
  $move6: inset(14% 0 61% 0);

  button {
    box-sizing: border-box;
    width: $dynamicButtonsWidth;
    height: $dynamicButtonsHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 6px;
    color: $buttonColor;
    background-color: transparent;
    font-size: 24px;
    cursor: pointer;
    position: relative;

    &::after {
      content: 'Button';
      position: absolute;
      font-size: 24px;
      box-sizing: border-box;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      clip-path: $move1;
    }

    &:hover {
      border: 1px solid $buttonColor;
      box-shadow: 0px 10px 10px -10px $buttonColor;

      &::after {
        animation: glitch 1s;
        text-shadow: 10 10px 10px black;
        animation-timing-function: steps(2, end);
        text-shadow: -3px -3px 0px $buttonColor, 3px 3px 0px #e94be8;
        background-color: transparent;
        border: 3px solid $buttonColor;
      }
    }
  }

  @keyframes glitch {
    0% {
      clip-path: $move1;
      transform: translate(0px, -10px);
    }

    10% {
      clip-path: $move2;
      transform: translate(-10px, 10px);
    }

    20% {
      clip-path: $move3;
      transform: translate(10px, 0px);
    }

    30% {
      clip-path: $move4;
      transform: translate(-10px, 10px);
    }

    40% {
      clip-path: $move5;
      transform: translate(10px, -10px);
    }

    50% {
      clip-path: $move6;
      transform: translate(-10px, 10px);
    }

    60% {
      clip-path: $move1;
      transform: translate(10px, -10px);
    }

    70% {
      clip-path: $move3;
      transform: translate(-10px, 10px);
    }

    80% {
      clip-path: $move2;
      transform: translate(10px, -10px);
    }

    90% {
      clip-path: $move4;
      transform: translate(-10px, 10px);
    }

    100% {
      clip-path: $move1;
      transform: translate(0);
    }
  }
}
</style>
