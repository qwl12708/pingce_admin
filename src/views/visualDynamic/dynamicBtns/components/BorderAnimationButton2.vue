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
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: $buttonColor;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;

    &::before,
    &::after {
      box-sizing: border-box;
      position: absolute;
      content: '';
      border: 2px solid transparent;
      width: 0;
      height: 0;
    }

    &::before {
      top: 0;
      left: 0;
    }

    &::after {
      bottom: 0;
      right: 0;
    }

    $duration: 0.2s;

    &:hover::before {
      width: 100%;
      height: 100%;
      border-top-color: $buttonColor;
      border-right-color: $buttonColor;
      transition: width $duration ease-out, height $duration ease-out $duration;
    }

    &:hover::after {
      width: 100%;
      height: 100%;
      border-bottom-color: $buttonColor;
      border-left-color: $buttonColor;
      transition: width $duration ease-out, height $duration ease-out $duration;
    }
  }
}
</style>
