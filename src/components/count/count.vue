<template>
    <div>
      <a href="javascript:;"><span @click="dcre">-</span></a>
          <span class="count">{{count}}</span>
      <a href="javascript:;"><span @click="add">+</span></a>
    </div>
</template>
<script>
    export default {
      props:{
        startCount:{
          type:Number,
          default:1
        }
      },
      data() {
          return {
            count:1
          }
      },
      mounted(){
        this.count = this.startCount
      },
      methods:{
        add(){
          this.count++
          this.$emit('add')
        },
        dcre(){
          if(this.count>1) {
            this.count--
            this.$emit('dcre',this.count)
          }
        }
      }
    }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  span
    display: inline-block
    width: 35px
    height: 27px
    line-height: 27px
    background: #f0f0f0
    text-align: center
  .count
    background: #fff

  div

</style>
