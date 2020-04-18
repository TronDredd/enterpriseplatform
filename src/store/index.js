import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_info: sessionStorage.getItem('user_info') ? JSON.parse(sessionStorage.getItem('user_info')) : {}
  },
  mutations: {
    //修改vuex中的user_info
    updateUserInfo(state, newInfo) {
      console.log(`update user info: ${JSON.stringify(newInfo)}`);
      state.user_info = newInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
