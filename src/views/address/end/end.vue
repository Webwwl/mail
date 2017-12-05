<template>
  <div>
    <div class="img-wrap">
      <img src="/static/ok-2.png" alt="">
    </div>
    <div class="congratulation">
      <p>Congratulations! <br>
        Your order is under processing!</p>
    </div>
    <div class="order-message">
      <span class="id">Order Id:{{routeQuery.id}}</span>
      <span class="price">Order Price:{{routeQuery.price}}</span>
    </div>
    <div class="goWhere">
      <router-link to="/shopcart">CartList</router-link>
      <router-link to="/" class="goodsList">GoodsList</router-link>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
      computed:{
          routeQuery(){
            let id = this.$route.query.id
            let price = this.$route.query.price
            return {
              id:id,
              price:price
            }
          }
      }
    }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  .img-wrap
    text-align: center
    margin: 60px 0 40px 0
    img
      width: 100px
      height: 120px
  .congratulation
    text-align: center
    height: 93px
    line-height: 53px
    font-size: 32px
  .order-message
    text-align: center
    margin-top: 28px
    span
      display: inline-block
      height: 30px
      line-height: 30px
      font-size: 20px
      color: rgba(180, 161, 161, 0.99)
      .id
        margin: 0 20px 0 0
  .goWhere
    text-align: center
    margin: 50px 0 0 0
    a
      display: inline-block
      width: 150px
      height: 40px
      line-height: 40px
      color: rgba(209, 67, 74, 0.37)
      border: 1px solid #d1434a
      &:hover
        background: rgba(209, 67, 74, 0.37)
    .goodsList
      background: #d14239
      color: #fff
      margin: 0 0 0 14px
      &:hover
        background: #d14239
    div

</style>
