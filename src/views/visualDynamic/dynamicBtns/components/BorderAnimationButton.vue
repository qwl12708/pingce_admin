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
    border: 2px solid transparent;
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

    $duration: 0.4s;

    &:hover::before {
      width: 100%;
      height: 100%;
      border-top-color: $buttonColor;
      border-right-color: $buttonColor;
      transition: width calc($duration / 4) ease-out, height calc($duration / 4) ease-out calc($duration / 4);
    }

    &:hover::after {
      width: 100%;
      height: 100%;
      border-bottom-color: $buttonColor;
      border-left-color: $buttonColor;
      transition: border-color 0s ease-out calc($duration / 2), width calc($duration / 4) ease-out calc($duration / 2),
        height calc($duration / 4) ease-out calc($duration / 4 * 3);
    }
  }
}
</style>
