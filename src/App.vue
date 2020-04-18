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
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
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
    height: 1rem;
    display: inline-block;
    vertical-align: -.125em;
    margin-left: 1rem;
  }
  .w-14 {
    width: 0.875rem;
  }
  .w-16 {
    width: 1rem;
  }
  .w-20 {
    width: 1.25rem;
  }
  .input-control {
    padding: .25rem;
    outline: none;
    border: 1px solid #7c818d;
    border-radius: .2rem;
  }
</style>
