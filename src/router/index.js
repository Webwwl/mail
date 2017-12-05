import Vue from 'vue'
import Router from 'vue-router'

import goods from '../views/goods/goods.vue'
import shopCart from '../views/shopCart/shopCart.vue'
import address from '../views/address/address.vue'
import addressSelect from '../views/address/addressSelect/addressSelect.vue'
import end from '../views/address/end/end.vue'
import pay from '../views/address/pay/pay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/goods'
    },
    {
      path:'/goods',
      component:goods
    },
    {
      path:'/address',
      component:address,
      redirect:'/address/addressSelect',
      children:[
        {
          path: 'addressSelect',
          component:addressSelect
        },
        {
          path: 'pay',
          component:pay
        },
        {
          path: 'end',
          component:end
        }
      ]
    },
    {
      path:'/shopCart',
      component:shopCart
    }
  ]
})
