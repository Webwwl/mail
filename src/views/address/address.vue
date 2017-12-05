<template>
  <div class="address">
    <navHeader></navHeader>
    <navBread><span>order</span></navBread>
    <steps :currentStep="currentStep"></steps>
    <router-view @AddressNext="AddressNext" @pay="pay" @payPrevious="previous"></router-view>
  </div>
</template>
<script>
  import navHeader from '../../components/header/header'
  import cartDialog from '../../components/dialog/dialog.vue'
  import notLoginDialog from '../../components/dialog/dialog.vue'
  import navBread from '../../components/navBread/navBread'
  import steps from '../../components/steps/steps.vue'
  export default {
    data() {
      return {
        currentStep:0,
        address:null,
        order:{}
      }
    },
    methods:{
      AddressNext(address){
        this.currentStep++
        this.address = address
      },
      previous(){
        this.currentStep--
      },
      pay(total){
        console.log(total)
        this.order.id = this.createOrderId()
        this.order.orderTotal = total
        this.order.orderStatus = '1'
        this.order.createTime = new Date()
        this.order.address = this.address
        this.order.goodsList = this.orderGoods
        this.submitOrder()
      },
      createOrderId(){
        let id = ''
        for(let i = 0;i<16;i++){
          id+=Math.floor(Math.random()*10).toString()
        }
        return id
      },
      submitOrder(){
        this.$axios.post('/users/pay',{
          order:this.order,
          userName:this.$store.state.userName
        })
          .then( (res) => {
            if(res.status===1){
              alert('pay failed')
            }
            else{
              this.currentStep++
              this.$router.push(`/address/end?id=${this.order.id}&price=${this.order.orderTotal}`)
            }
          })
      }
    },
    computed:{
      orderGoods(){
        return this.$store.state.order
      }
    },
    components: {navHeader, cartDialog, navBread,notLoginDialog,steps}
  }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  .address
    min-height: 800px

</style>
