<template>
  <div class="container">
    <button>Button</button>
  </div>
</template>

<style scoped lang="scss">
@import '../buttonVariables.scss';
.container {
  button {
    width: $dynamicButtonsWidth;
    height: $dynamicButtonsHeight;
    border: 0;
    border-radius: 6px;
    background: $buttonColor;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0px 10px 20px -10px $buttonColor;
    animation: 0.2s ease 0s 1 normal none running show, 1.2s ease 1s infinite normal none running shake;

    &:hover {
      transform: scale(1.1);
    }

    @keyframes show {
      0% {
        transform: scale(0);
        opacity: 0;
      }

      80% {
        transform: scale(1.05);
        opacity: 1;
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes shake {
      0% {
        transform: translate3d(0px, 0px, 0px);
      }

      10% {
        transform: translate3d(-3%, 0px, 0px) rotate3d(0, 0, 1, -5deg);
      }

      20% {
        transform: translate3d(2%, 0px, 0px) rotate3d(0, 0, 1, 3deg);
      }

      30% {
        transform: translate3d(-1%, 0px, 0px) rotate3d(0, 0, 1, -3deg);
      }

      40% {
        transform: translate3d(1%, 0px, 0px) rotate3d(0, 0, 1, 2deg);
      }

      50% {
        transform: translate3d(-1%, 0px, 0px) rotate3d(0, 0, 1, -1deg);
      }

      60% {
        transform: translate3d(0px, 0px, 0px);
      }

      100% {
        transform: translate3d(0px, 0px, 0px);
      }
    }
  }
}
</style>
