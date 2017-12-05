<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <a href="#" class="now">Goods</a>
    </nav-bread>
    <div class="sortPrice">
      <div class="container sortContent">
        <div class="choose">
          <a>sort by</a>
          <a class="sortToggle" v-if="isSortByUp" @click="changeSort" href="javascript:void(0)">price&nbsp;&uarr;</a>
          <a class="sortToggle" v-if="!isSortByUp" @click="changeSort" href="javascript:void(0);">price&nbsp;&darr;</a>
        </div>
      </div>
    </div>
    <div class="goodList">
      <div class="container">
        <div class="priceChoose">
          <h2>P R I C E</h2>
          <ul>
            <li v-for="(item,index) in priceFilter" :class="{active:filterIndex===index}"
            @click="filterClick(item,index)">{{item.title }}</li>
          </ul>
        </div>
        <div class="goods">
          <ul>
            <li v-for="(item,index) in goodsList1">
              <img v-lazy="'/static/'+item.productImage" alt="">
              <p class="description">{{item.productName}}</p>
              <p class="price">{{item.salePrice | filterPrice}}</p>
              <p ><a href="javascript:void(0)" class="addCart" @click="addCart(item)">加入购物车</a></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="notLoginDialog-wrap">
      <notLoginDialog :dialogShow="isNotLoginDialogShow">
         <p>您当前未登录&nbsp;请登录</p>
         <a href="javascript:;" @click="isNotLoginDialogShow=false">关闭</a>
      </notLoginDialog>
    </div>
    <div class="addCart-wrap">
      <cartDialog :dialogShow="isAddCartDialogShow">
        <p>加入购物车成功</p>
        <a href="javascript:;" @click="isAddCartDialogShow=false" class="continueShop">继续购物</a>
        <a href="javascript:;" @click="goCart">查看购物车</a>
      </cartDialog>
    </div>
  </div>
</template>
<script>
  import navHeader from '../../components/header/header'
  import cartDialog from '../../components/dialog/dialog.vue'
  import notLoginDialog from '../../components/dialog/dialog.vue'
  import navBread from '../../components/navBread/navBread'

  export default {
    data() {
      return {
        isSortByUp: true,
        goodsList:[],
        goodsList1:[],
        priceFilter:[
          {
            start:0,end:100000000,
            title:'ALL'
          },
          {
            start:0.00,end:500.00,
            title:'0.00 -- 500.00'
          },
          {
            start:500.00,end:1000.00,
            title:'500.00 -- 1000.0'
          },
          {
            start:1000.00,end:2000.00,
            title:'1000.00 -- 2000.00'
          }
        ],
        filterIndex:0,
        isNotLoginDialogShow:false,
        isAddCartDialogShow:false
      }
    },
    computed:{
      isLogin(){
        return this.$store.state.isLogin
      },
      userName(){
        return this.$store.state.userName
      }
    },
    filters:{
      filterPrice(str){
        return str + "￥"
      }
    },
    mounted() {
      this.getGoods()
    },
    methods: {
      getGoods(){
        this.$axios.get('/goods',{
          params:{
            limit:null
          }
        })
          .then( res => {
            this.goodsList = res.data
            this.goodsList1 = res.data
          }).catch( err => {
          console.log(err)
        })
      },
      changeSort() {
        this.isSortByUp = !this.isSortByUp
        this.goodsList1.reverse()

      },
      filterClick(item,index) {
        this.filterIndex = index
        if(item.title === 'ALL') {
          this.goodsList1 = this.goodsList
        }else {
          let filteredGoods = []
          this.goodsList.forEach((val) => {
              if(val.salePrice >= item.start && val.salePrice <= item.end)
                filteredGoods.push(val)
          })
          this.goodsList1 = filteredGoods
        }
      },
      addCart(item){
        if(this.isLogin) {
          this.isAddCartDialogShow = true
          this.$store.commit('goodsCountAdd')
          this.addCartList(item,this.userName)
        }
        else {
          this.isNotLoginDialogShow = true
        }
      },
      addCartList(item,userName){
          item.checked = '1'
          item.productNum = '1'
        this.$axios.post('/users/addCart',{
          item:item,
          userName,userName
        })
          .then( (res) => {
            if(res.data.status === 1)
              alert(res.data.msg)
            else{
              if(res.data.cartCount)
               this.$store.commit('setCartCount',res.data.cartCount)
            }
          })
      },
      goCart(){
        this.$router.push('/shopCart')
      }
    },
    components: {navHeader, cartDialog, navBread,notLoginDialog}
  }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  .sortPrice
    height: 50px
    margin: 50px 0 20px 0
    .sortContent
      background: #fff
      overflow: hidden
      .choose
        float: right
        a
          display: inline-block
          width: 80px
          height: 50px
          line-height: 50px
          text-align: center
          color: rgba(168, 108, 104, 0.63)
        .sortToggle
          color: rgba(238, 100, 8, 0.94)
  .goodList
    .container
      display: flex
      justify-content: flex-end
      .priceChoose
        width: 250px
        h2
          height: 30px
          line-height: 30px
          color: #605f5f
        ul
          margin: 10px 0 0 0
          .all
            font-weight: bold
            border-left: 3px solid #ee7a23
            padding: 0 0 0 16px
            color: #ee7a23
          li
            margin: 10px 0 0 0
            color: #dadade
            height: 30px
            line-height: 30px
          li:hover
            border-left: 3px solid #ee7a23
            padding-left: 16px
            transition: padding-left 0.7s
            color: #ee7a23
          .active
            border-left: 3px solid #ee7a23
            padding-left: 16px
            transition: padding-left 0.7s
            color: #ee7a23
      .goods
        flex: 1 1 0%
        ul
          li
            width: 21%
            background: #fff
            display: inline-block
            margin: 0 10px 10px 0
            padding: 0 10px
            border: 2px solid #f5f7fc
            &:hover
              border: 2px solid #d1434a
              box-shadow: 2px -2px 3px rgba(209,67,74,0.3)
            img
              width: 100%
            .description
              height: 20px
              line-height: 20px
              font-size: 16px
              color: rgba(112, 100, 100, 0.97)
              margin: 0 0 50px 0
            .price
              height: 30px
              line-height: 30px
              margin: 0 0 10px 0
              color: #785f5f
              font-size: 22px
            .addCart
              display: block
              height: 50px
              line-height: 50px
              border: 1px solid #d1434a
              color: red
              text-align: center
              font-size: 15px
              font-weight: 700
              margin: 0 0 10px 0
              &:hover
                background: rgba(221, 103, 103, 0.42)

  .notLoginDialog-wrap
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
  .addCart-wrap
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
    .continueShop
      margin: 0 50px 30px 80px





  div


</style>
