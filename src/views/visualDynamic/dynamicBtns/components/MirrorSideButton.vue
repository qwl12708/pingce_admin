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
    font-size: 24px;
    background-color: transparent;
    color: $buttonColor;
    border: 2px solid $buttonColor;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      display: block;
      background-color: #ffffff50;
      position: absolute;
      width: 20px;
      height: 80px;
      top: -20px;
      left: -50px;
      transform: rotate(-45deg);
    }

    &:hover {
      &::after {
        left: 120%;
        transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
        -webkit-transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
      }
    }

    &:active {
      color: $buttonColor2;
      border: 2px solid $buttonColor2;
    }
  }
}
</style>
