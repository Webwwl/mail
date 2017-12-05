<template>
    <div class="nav">
        <div class="container">
          <router-link to="/" class="home">Home</router-link>
          <slot ></slot>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  .nav
    background: #f0f0f0
    color: #605f5f
    a
      display: inline-block
      height: 45px
      line-height: 45px
      margin: 0 15px 0 0
    .now
      color: red
    .home
      position: relative
    .home::after
      content: '/'
      position: absolute
      right: -13px

</style>
