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
    border: 0 !important;
    border-radius: 6px;
    background-color: $buttonColor;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
    transition: border-radius 1s;
    -webkit-transition: border-radius 1s;

    &:hover {
      border-bottom-right-radius: 50px;
      border-top-left-radius: 50px;
    }
  }
}
</style>
