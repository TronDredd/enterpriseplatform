<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
    export default {
      methods: {
        saveState() {
          sessionStorage.setItem('user_info', JSON.stringify(this.$store.state.user_info))
        }
      },
      mounted() {
        window.addEventListener('unload', this.saveState);
      },
    }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,body {
    /*高度继承*/
    height: 100%;
  }
  html {
    font-size: 62.5%; /*=10px*/
  }
  body {
    font-size: 1.4rem; /*=19rem*/
  }
  ul,li {
    list-style: none;
  }
  button:focus {
    outline: none !important;
  }
  a:hover {
    text-decoration: none!important;
  }
  input:focus {
    outline: none;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px inset !important;
  }
  @font-face {
    font-family: Montserrat-Regular;
    src: url("assets/fonts/Montserrat-Regular.ttf");
  }
  #app {
    font-family: Montserrat-Regular;
    /*text-align: center;*/
    width: 100%;
    height: 100%;
  }
  .margin-left-8 {
    margin-left: .8rem;
  }
  .margin-left-4 {
    margin-left: .4rem;
  }
  .pointer {
    cursor: pointer;
  }
  .svg-inline {
    height: 2rem;
    display: inline-block;
    vertical-align: -.125em;
  }
  .w-14 {
    width: 1.4rem;
  }
  .w-16 {
    width: 1.6rem;
  }
  .w-20 {
    width: 2rem;
  }
  .input-control {
    padding: .25rem;
    outline: none;
    border: 1px solid #7c818d;
    border-radius: .2rem;
  }
</style>
