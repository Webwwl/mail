<template>
    <div>
      <div class="steps">
        <ul>
          <li v-for="(item,index) in steps" :class="{currentStep:index<=currentStep}">{{item}}</li>
        </ul>
      </div>
    </div>
</template>
<script>
    export default {
      props:{
        currentStep:{
          type:Number,
          default:0
        }
      },
        data() {
            return {
              steps:['Confirm Address','View Your Order','Finished']
            }
        }
    }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  .steps
    ul
      display: flex
      .currentStep
        color: #d1434a
        border-bottom-color: #d1434a
      li
        flex: 1 1 auto
        margin: 40px 0 0 0
        font-weight: 700
        color: #ccc
        border-bottom: 2px solid #ccc
        padding: 0 0 20px 0
        text-align: center

</style>
