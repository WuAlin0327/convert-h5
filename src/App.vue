<template>
  <div id="app">
    <router-view>
    </router-view>
    <Footer>

    </Footer>
  </div>
</template>

<script>

import Footer from "./components/Footer";
export default {
  name: 'app',
  components: {
    Footer
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  ul li{
    list-style: none;
  }
  body {
    width: 100%;
    height: 100%;
    outline: 0;
    color: #333;
    font-size: .6rem;
  }
</style>
