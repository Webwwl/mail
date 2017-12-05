<template>
  <div class="header">
    <div class="container">
      <img src="./logo.png" alt="">
      <ul class="login">
        <li><a href="#" v-if="isLogin">{{userName}}</a></li>
        <li><a href="#" v-if="!isLogin" @click="showLogin">login</a></li>
        <li><a href="#" v-if="isLogin" @click="loginOut">logout</a></li>
        <li @click="goCart">
          <i class="icon iconfont icon-cart"></i>
          <div class="goodCount" v-show="goodsCount>0">{{goodsCount}}</div>
        </li>
      </ul>
    </div>
    <div class="loginDialog-wrap">
      <loginDialog :dialogShow="goLogin">
        <div class="cancel" @click="cancelLogin"><a href="javascript:;">X</a></div>
        <div class="login-content">
          <ul>
            <li v-show="inputErr" class="input-err">
              <i class="icon iconfont icon-information"></i>
              <span>{{msg}}</span>
            </li>
            <li>
              <i class="icon iconfont icon-account"></i>
              <input type="text" v-model="inputUserName" placeholder="UserName" ref="userName">
            </li>
            <li>
              <i class="icon iconfont icon-yingckjian"></i>
              <input type="text" v-model="inputUserPwd"  placeholder="UserPwd" @keyup.enter="login">
            </li>
          </ul>
          <div class="button" @click = 'login'>
            <a href="javascript:;">登&nbsp;&nbsp;录</a>
          </div>
        </div>
      </loginDialog>
    </div>
    <div class="notLoginDialog-wrap">
      <notLoginDialog :dialogShow="isNotLoginDialogShow">
        <p>您当前未登录&nbsp;请登录</p>
        <a href="javascript:;" @click="isNotLoginDialogShow=false">关闭</a>
      </notLoginDialog>
    </div>
  </div>
</template>
<script>
  import notLoginDialog from '../../components/dialog/dialog.vue'
  import loginDialog from '../../components/dialog/dialog.vue'
  export default {
    components:{notLoginDialog,loginDialog},
    data() {
      return {
        goLogin: false,
        inputUserPwd: null,
        inputUserName: '',
        inputErr: false,
        msg: '账户密码不能为空',
        isNotLoginDialogShow:false
      }
    },
    computed:{
      isLogin(){
        return this.$store.state.isLogin
      },
      goodsCount(){
        return this.$store.state.goodsCount
      },
      userName(){
        return this.$store.state.userName
      }
    },
    methods:{
      showLogin(){
        this.goLogin = !this.goLogin
        this.$nextTick( () => this.$refs.userName.focus())
      },
      login(){
        if(!this.inputUserPwd || !this.inputUserName){
          this.inputErr = true
          return
        }
        this.$axios.post('/users/login',{
            userName:this.inputUserName,
            userPwd:this.inputUserPwd
        })
          .then( (res) => {
            let _res = res.data
            this.msg = _res.msg
            if (_res.status === 1) {
              this.msg = '密码错误'
              this.inputErr = true
          }
            else{
              this.$store.commit('setUserId',_res.userId)
              this.$store.commit('setUserName',_res.userName)
              this.$store.commit('login')
              this.$store.commit('setCartCount',_res.cartCount)
              this.cancelLogin()
            }
          })
      },
      cancelLogin(){
        this.goLogin = false
        this.inputErr = false
        this.inputUserName = ''
        this.inputUserPwd = null
      },
      loginOut(){
        this.$axios.post('/users/loginOut')
          .then( (res) => {
            if(res.data.status === 0){
              this.$store.commit('unLogin')
              this.$router.push('/')
            }
          })
      },
      goCart(){
        if(!this.isLogin){
          this.isNotLoginDialogShow = true
        }else
          this.$router.push('/shopCart')
      }
    }
  }
</script>
<style scoped lang='sass' rel='styleSheet/sass'>
  @import './iconFont/iconfont.css'
  @media only screen and ('max-width: 500px')
    img
      width: 100px
      height: 40px
      margin-top: 12px
    .login
      font-size: 18px
      li
        margin-right: 2px
  .header
    background: #fff
    .container
      overflow: hidden
      .login
        height: 60px
        float: right
        li
          display: inline-block
          text-align: center
          font-size: 22px
          margin: 0 10px 0 0
          line-height: 60px
          position: relative
          .iconfont
            font-size: 24px
          .goodCount
            position: absolute
            border-radius: 50%;
            background: rgba(255, 0, 0, 0.67)
            width: 20px
            height: 20px
            font-size: 10px
            color: #fff
            line-height: 20px
            right: -5px
            top: 5px
    .login-dailog
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
      .login-content
        width: 90%
        margin: 40px auto 0 auto
        .input-err
          padding: 0
          border: none
          span
            display: inline-block
            height: 18px
            width: 80%
            color: #ff3b35
            font-size: 12px
          .iconfont
            font-size: 10px
        li
          border: 1px solid #ccc
          margin: 0 0 15px 0
          padding: 10px
          .iconfont
            font-size: 18px
            height: 32px
            width: 84%
            vertical-align: bottom
            margin: 0 0 0 10px
          input
            outline: none
            display: inline-block
            height: 35px
            padding-left: 10px
            width: 80%
        .button
          a
            display: block
            margin: 30px 0 0 0
            background: #009de6
            height: 30px
            line-height: 30px
            text-align: center
            color: #fff
            &:hover
              background: rgba(93, 143, 230, 0.5)
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




</style>
