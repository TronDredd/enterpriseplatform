import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "../views/account/LoginComponent";
import MainComponent from "../views/main/MainComponent";
import AccountComponent from "../views/account/AccountComponent";
import RegisterComponent from "../views/account/RegisterComponent";
import DemandListComponent from "../views/main/function/demand/DemandListComponent";
import MyDemandComponent from "../views/main/function/demand/MyDemandComponent";
import OrderListComponent from "../views/main/function/order/OrderListComponent";
import OrderDetailComponent from "../views/main/function/order/OrderDetailComponent";
import CreateOrderComponent from "../views/main/function/order/CreateOrderComponent";
import OrderStatisticsComponent from "../views/main/function/order/OrderStatisticsComponent";
import ProductListComponent from "../views/main/function/product/ProductListComponent";
import MyProductComponent from "../views/main/function/product/MyProductComponent";
import DemandDetailComponent from "../views/main/function/demand/DemandDetailComponent";
import DemandDetailSelfComponent from "../views/main/function/demand/DemandDetailSelfComponent";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'Login'}
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountComponent,
    children: [
      {
        path: '/',
        name: 'Login',
        component: LoginComponent
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: MainComponent,
    meta:{ requireAuth: true },
    children: [
      {
        path: 'demand_list',
        component: DemandListComponent
      },
      {
        path: 'demand_detail',
        component: DemandDetailComponent
      },
      {
        path: 'my_demand',
        component: MyDemandComponent
      },
      {
        path: 'my_demand_detail',
        component: DemandDetailSelfComponent
      },
      {
        path: 'order_list',
        component: OrderListComponent
      },
      {
        path: 'order_detail',
        component: OrderDetailComponent
      },
      {
        path: 'create_order',
        component: CreateOrderComponent
      },
      {
        path: 'order_statistics',
        component: OrderStatisticsComponent
      },
      {
        path: 'product_list',
        component: ProductListComponent
      },
      {
        path: 'my_product',
        component: MyProductComponent
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局导航守卫
// router.beforeEach((to, from, next) => {
//   console.log(`global router guard`);
//   if(to.matched.some(record => record.meta.requireAuth)) {
//     console.log(`token存在判定`);
//     if(sessionStorage.getItem('token') == undefined) {
//       console.log(`sessionStorage中不存在token,返回登录界面`);
//       next({
//         name: 'Login'
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })

export default router
