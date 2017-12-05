const store = {
  state:{
    isLogin: false,
    userName: 'admin',
    userId:null,
    goodsCount: 0,
    order:[]
  },
  getters:{

  },
  mutations:{
    setCartCount(state,count){
      state.goodsCount = count
    },
    goodsCountAdd(state){
      state.goodsCount++
    },
    goodsCountDec(state){
      state.goodsCount--
    },
    unLogin(state){
      state.isLogin = false
    },
    login(state){
      state.isLogin = true
    },
    setUserName(state,userName){
      state.userName = userName
    },
    setUserId(state,userId){
      state.userId = userId
    },
    setOrder(state,order){
      state.order = order
    }
  }
}

module.exports = store
