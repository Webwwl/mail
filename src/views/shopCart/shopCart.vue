<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <a href="#" class="now">shopCart</a>
      </nav-bread>
      <div class="container">
        <div class="cart">
          <div class="cart-title">
            <h2>My&nbsp;Cart</h2>
          </div>
          <div class="cart-item">
            <ul class="item-head">
              <li class="item">ITEMS</li>
              <li>PRICE</li>
              <li>QUANTITY</li>
              <li>TOTAL</li>
              <li>EDIT</li>
            </ul>
            <div class="item-content">
              <ul v-for="(item,index) in cartList" >
                <li class="item">
                  <a :class="{checked:item.checked==='1'}" @click="setChecked(index)"></a>
                  <div class="img-wrap">
                    <img :src="'/static/'+item.productImage" alt="">
                  </div>
                  <div class="name-wrap">{{item.productName}}</div>
                </li>
                <li><p class="price">{{item.salePrice}}</p></li>
                <li><count :startCount="parseInt(item.productNum)" @add="countAdd(index)" @dcre="countDcre(index)"></count></li>
                <li class="total">{{parseInt(item.productNum)*parseInt(item.salePrice) | total}}</li>
                <li @click="goRemove(item)"><i class="iconfont icon-lajixiang"></i></li>
              </ul>
            </div>
          </div>
          <div class="cart-foot">
            <div class="foot-left">
              <a @click="selectAll" :class="{checked:isSelectAll}"></a>select All
            </div>
            <div class="foot-right">
              totalPrice:
              <span>{{totalPrice | total}}</span>
            <a href="javascript:;"  @click="checkedOut">CHECKOUT</a>
            </div>
          </div>
        </div>
      </div>
      <div class="noOrderDialog-wrap">
        <noOrderDialog :dialogShow="isNoOrder">
          <p>您当前未选择商品&nbsp;请选择</p>
          <a href="javascript:;" @click="isNoOrder=false">关闭</a>
        </noOrderDialog>
      </div>
      <div class="deleteDialog-wrap">
        <deleteDialog :dialogShow="isDelete">
          <p>Are You Sure ?</p>
          <a href="javascript:;" @click="isDelete=false" class="no">NO</a>
          <a href="javascript:;" @click="remove(removeItem)">YES</a>
        </deleteDialog>
      </div>
    </div>
</template>
<script>
  import navHeader from '../../components/header/header'
  import cartDialog from '../../components/dialog/dialog.vue'
  import navBread from '../../components/navBread/navBread'
  import count from '../../components/count/count.vue'
  import noOrderDialog from '../../components/dialog/dialog.vue'
  import deleteDialog from '../../components/dialog/dialog.vue'
    export default {
      data() {
          return {
            cartList:[],
            isSelectAll:false,
            isNoOrder:false,
            isDelete:false,
            removeItem:null
          }
      },
      components:{navHeader,navBread,count,noOrderDialog,deleteDialog},
      mounted(){
        this.getCartList()
      },
      filters:{
        total(val){
          return '￥ '+parseInt(val).toFixed(2)
        }
      },
      methods:{
        getCartList(){
          this.$axios.get('/users/cart', {
            params:{
              userName:this.userName
            }
          })
            .then( (res) => {
              let _res = res.data
              this.cartList = _res.cartList
            })
        },
        countAdd(index){
          this.cartList[index].productNum = (parseInt(this.cartList[index].productNum)+1).toString()
        },
        countDcre(index){
          this.cartList[index].productNum = (parseInt(this.cartList[index].productNum)-1).toString()
        },
        setChecked(index){
          if(this.cartList[index].checked === '1')
            this.cartList[index].checked = '0'
          else
            this.cartList[index].checked = '1'
        },
        selectAll(){
          if(!this.isSelectAll) {
            this.cartList.forEach((item) => {
              item.checked = '1'
            })
          }
          else{
            this.cartList.forEach((item) => {
              item.checked = '0'
            })
          }
          this.isSelectAll = !this.isSelectAll
        },
        goRemove(item){
          this.isDelete = true
          this.removeItem = item
        },
        remove(item){
          this.isDelete = false
          this.$axios.post('users/removeCart',{
            item:item,
            userName:this.userName
          })
            .then( (res) => {
              let _res = res.data
              if(_res.status === 0) {
                this.getCartList()
                this.$store.commit('setCartCount',_res.cartCount)
              }
            })
        },
        checkedOut() {
          let order = this.cartList.filter((val) => {
            return val.checked === '1'
          })
          if (!order.length) {
            this.isNoOrder = true
          }
          else {
            this.$store.commit('setOrder', order)
            this.$router.push('/address')
          }
        }
      },
      computed:{
          userName(){
            return this.$store.state.userName
        },
        totalPrice(){
          let total = 0
          this.cartList.forEach( (item) => {
            if(item.checked === '1') {
              let singleAllPrice = parseInt(item.productNum) * parseInt(item.salePrice)
              total += singleAllPrice
            }
          })
          return total
        }
      }
    }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  @import './iconFont/iconfont.css'
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
            .iconfont
              font-size: 23px
          .price
            color: rgba(139, 129, 129, 0.98)
          .total
            color: rgba(234, 31, 31, 0.79)
    .cart-foot
      margin: 30px 0 0 0
      background: #fff
      display: flex
      height: 60px
      line-height: 60px
      justify-content: space-between
      .foot-left
        flex: 0 0 300px
        color: #7d7070
        font-size: 18px
        a
          border: 1px solid #c9dacb
          display: inline-block
          width: 30px
          height: 30px
          border-radious: 50%
          float: left
          margin: 12px 18px 0 26px
          border-radius: 50%
      .foot-right
        font-size: 20px
        color: #ccc
        span
          font-weight: bold
          color: #d1434a
        a
          background: #d1434a
          display: inline-block
          color: #fff
          padding: 0px 20px
          font-size: 20px
          margin: 0 0 0 22px

    div

  .noOrderDialog-wrap
    p
      height: 30px
      line-height: 30px
      text-align: center
      color: #605f5f
      font-size: 17px
      margin-top: 48px
    a
      font-size: 13px
      display: block
      width: 141px
      height: 32px
      line-height: 32px
      text-align: center
      color: red
      margin: 69px auto 33px auto
      border: 1px solid #d1434a
      &:hover
        background: #eea5a1
  .deleteDialog-wrap
    p
      height: 30px
      line-height: 30px
      text-align: center
      color: #605f5f
      font-size: 17px
      margin: 48px 0 55px 0
    a
      font-size: 13px
      display: inline-block
      width: 141px
      height: 32px
      line-height: 32px
      text-align: center
      color: red
      border: 1px solid #d1434a
      &:hover
        background: #eea5a1
    .no
      margin: 0 50px 30px 80px
</style>
