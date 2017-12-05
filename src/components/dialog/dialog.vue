<template>
      <div class="login-dailog" v-show="dialogShow" >
        <div class="login-wrap">
          <div class="login-main">
            <slot></slot>
          </div>
        </div>
      </div>
</template>
<script>
    export default {
      props: {
        dialogShow: {
          type: Boolean,
          default: true
        }
      },
      data() {
          return {
          }
      },
      computed:{
        isShow(){
          return this.dialogShow
        }
      },
      methods:{
        hidden(){
          this.isShow = false
        }
      }
    }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  .login-dailog
    .login-wrap
      position: fixed
      z-index: 10
      top: 0
      width: 1360px
      min-height: 800px
      background: rgba(0, 0, 0, 0.5)
      .login-main
        position: relative
        border-top: 1px solid rgba(0,0,0,0.5)
        width: 500px
        background: #fff
        margin: 150px auto 0 auto
        padding: 0 0 20px 0
        z-index: 100
        .cancel
          position: absolute
          right: 0
          top: 5px
          color: #7777ac
          a
            display: block
            width: 30px
            height: 30px
            font-size: 24px



</style>
