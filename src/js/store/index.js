import Vue from 'vue'
import Vuex from 'vuex'
import todoListModule from './modules/todo-list-module'
import userInfo from './modules/user-info-module'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        todoListModule,
        userInfo
    }
})