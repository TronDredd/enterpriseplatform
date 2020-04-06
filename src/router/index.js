import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "../views/account/LoginComponent";
import MainComponent from "../views/main/MainComponent";
import AccountComponent from "../views/account/AccountComponent";
import RegisterComponent from "../views/account/RegisterComponent";
import DemandListComponent from "../views/main/function/DemandListComponent";

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
    children: [
      {
        path: 'demand_list',
        component: DemandListComponent
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
