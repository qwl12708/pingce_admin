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
    background: $buttonColor;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: -10px;
      height: 100%;
      width: 10px;
      background-color: rgba(35, 162, 253, 0.4);
      transition: 3s all ease-in-out;
      transform: skewY(-45deg);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: -5px;
      width: 100%;
      height: 10px;
      background-color: rgba(35, 162, 253, 0.4);
      transform: skewX(-45deg);
    }

    &:hover {
      transform: translate(8px, -8px);
      box-shadow: -20px 20px 20px rgba(35, 162, 253, 0.4);
    }
  }
}
</style>
