<template>
  <div class="container">
    <div class="cart">
      <div class="cart-title">
        <h2>My&nbsp;Order</h2>
      </div>
      <div class="cart-item">
        <ul class="item-head">
          <li class="item">ITEMS</li>
          <li>PRICE</li>
          <li>QUANTITY</li>
          <li>TOTAL</li>
        </ul>
        <div class="item-content">
          <ul v-for="(item,index) in orderList" >
            <li class="item">
              <div class="img-wrap">
                <img :src="'/static/'+item.productImage" alt="">
              </div>
              <div class="name-wrap">{{item.productName}}</div>
            </li>
            <li class="price"><p>{{item.salePrice | total}}</p></li>
            <li><p>{{item.productNum}}</p></li>
            <li class="total">{{parseInt(item.productNum)*parseInt(item.salePrice) | total}}</li>
          </ul>
        </div>
      </div>
      <div class="cart-foot">
        <p>totalMoney:&nbsp;<span>{{totalPrice | total}}</span></p>
        <p><a href="javascript:;" @click="pay">PAY</a></p>
      </div>
    </div>
    <div class="goStep">
      <a href="javascript:;" @click="previous" >PREVIOUS</a>
    </div>
  </div>


</template>
<script>
    export default {
      data() {
          return {

          }
      },
      filters:{
        total(val){
          return '￥ '+parseInt(val).toFixed(2)
        }
      },
      methods:{
        pay(){
          this.$emit('pay',this.totalPrice)
        },
        previous(){
          this.$emit('payPrevious')
          this.$router.push(`/address/addressSelect`)
        }
      },
      computed:{
        orderList(){
          return this.$store.state.order
        },
        totalPrice(){
          let total = 0
          this.orderList.forEach( (item) => {
              let singleAllPrice = parseInt(item.productNum) * parseInt(item.salePrice)
              total += singleAllPrice
          })
          return total
        }
      }
    }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  .cart
    .checked
      background: #febe62
    margin: 50px 0 0 0
    .cart-title
      height: 30px
      line-height: 30px
      font-size: 30px
      margin-bottom: 20px
    .cart-item
      background: #fff
      li.item
        flex: 0 0 430px
      li
        display: inline-block
        flex-grow: 1
      .item-head
        display: flex
        background: #605f5f
        li
          text-align: center
          height: 40px
          line-height: 40px
          font-size: 20px
          color: #fff
      .item-content
        ul
          display: flex
          border: 1px solid rgba(204, 204, 204, 0.48)
          border-top: none
          .item
            text-align: left
            line-height: 145px
            height: 145px
            position: relative
            font-size: 16px
            a
              border: 1px solid #c9dacb
              display: inline-block
              width: 25px
              height: 25px
              border-radius: 50%
              float: left
              margin: 57px 0 0 24px
            .img-wrap
              display: inline-block
              width: 80px
              height: 80px
              float: left
              margin: 30px
              border: 1px solid rgba(220,220,220,0.5)
              padding: 4px
              img
                width: 100%
                height: 100%
            .name-wrap
              display: inline-block
              height: 145px
          li
            height: 145px
            line-height: 145px
            text-align: center
            font-size: 18px
          .price
            color: rgba(139, 129, 129, 0.98)
          .total
            color: rgba(234, 31, 31, 0.79)
    .cart-foot
      p
        height: 50px
        line-height: 50px
        text-align: right
        padding-right: 80px
        font-size: 25px
        margin: 25px  0  5px 0
        color: rgba(139, 129, 129, 0.98)
        span
          color: rgba(234, 31, 31, 0.79)
        a
          display: block
          width: 40px
          text-align: center
          width: 162px
          float: right
          background: rgba(255, 0, 0, 0.72)
          color: #fff

    div

  .goStep
    display: flex
    flex-direction: row
    justify-content: space-between
    a
      display: block
      flex: 0 0 200px
      text-align: center
      height: 40px
      line-height: 40px
      color: #fff
      font-size: 30px
      background: #cd5e50
      margin: 0 50px 0 0
      &:hover
        background: #FF7464

        div



  div

</style>
