import Vue from 'vue'
import Vuex from 'vuex'
import users from './module/users'
import auth from './module/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users: users,
    auth: auth,
  }
})
