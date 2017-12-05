<template>
  <div>
    <div class="container">
      <h3 class="title">Address List</h3>
      <div class="addressList">
        <ul>
          <li v-for="(item,index) in addressListShow" :class="{active:currentIndex===index}" @click="currentIndex=index">
            <p class="name">{{item.userName}}</p>
            <p class="street">{{item.streetName}}</p>
            <p class="tel">{{item.tel}}</p>
            <p class="addressNum" v-show="index!=0">address {{index+1}}</p>
            <p class="default" v-show="index===0">default address</p>
          </li>
        </ul>
        <p class="more" v-if="isMore" @click="more"><a href="javascript:;">more&nbsp;&or;</a></p>
        <p class="onlyone" v-else="!isMore" @click="less"><a href="javascript:;">less&nbsp;&and;</a></p>
      </div>
      <div class="goStep">
        <!--<a href="javascript:;" @click="previous">PREVIOUS</a>-->
        <a href="javascript:;" @click="next">NEXT</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentIndex:0,
        addressList:[],
        addressListShow:[],
        isMore:true,
        isNoOrder:false
      }
    },
    mounted(){
      this.getAddressList()
    },
    methods:{
      getAddressList(){
        this.$axios.get('/users/address',{
          params:{
            userName:this.userName
          }
        })
          .then( res => {
            let _res = res.data
            if(_res.status === 0){
              this.addressList = _res.addressList
              this.initShow()
            }
          })
      },
      initShow(){
        this.addressListShow = this.addressList.slice(0,1)
      },
      more(){
        this.isMore=false
        this.addressListShow = this.addressList
      },
      less(){
        this.isMore=true
        this.addressListShow = this.addressList.slice(0,1)
        this.currentIndex = 0
      },
      getSelectAddress(){
        return this.addressList[this.currentIndex]
      },
      next(){
        this.$router.push('/address/pay')
        this.$emit('AddressNext',this.getSelectAddress())
      }
    },
    computed:{
      userName(){
        return this.$store.state.userName
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
  h3
    color: #ccc
    font-size: 24px
    font-weight: 600
    margin: 30px 0 0 30px
  .addressList
    margin: 15px 0 0 0
    ul
      li.active
        border-color: #ee7a23
        .addressNum
          color: #ee7a23
        .default
          color: #ee7a23
      li
        border: 2px solid #ccc
        width: 22%
        height: 138px
        padding: 10px
        color: #605f5f
        display: inline-block
        margin: 0 10px 20px 0
        p
          margin: 0 0 10px 0
        .tel
          margin: 30px 0 10px 0
    .more
      text-align: center
      a
        color: #ee7a3b
    .onlyone
      text-align: center
      a
        color: #ee7a3b
  .goStep
    display: flex
    flex-direction: row-reverse
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

</style>
