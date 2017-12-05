<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
  @import './assets/css/reset.css'
  body
    background: #f5f7fc
    .container
      width: 95%
      margin: 0 auto
</style>
