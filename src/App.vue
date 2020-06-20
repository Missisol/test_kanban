<template>
  <div id="app">
    <home-page></home-page>
  </div>
</template>

<script>
import HomePage from './pages/HomePage.vue'

export default {
  components: {
    HomePage,
  },
  data: () => ({ }),
  methods: {}
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100vh;
  background: #383A42;
}

</style>
