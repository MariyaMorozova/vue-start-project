import Vue from 'vue'
import Vuex from 'vuex'
import store from './../../store/index.js'

import TodoController from './TodoController'
import NotFound from './../../components/not-found/'
import template from './index.pug'

export default () => {

	Vue.use(Vuex)

	const app = new Vue({
		el: '#app',
		template,
        store,
        components: {
			'todo-controller': TodoController,
            'not-found': NotFound
        },
        data() {
            return {
                currentRoute: window.location.pathname
            }
        },
		computed: {
            isTodoController() {
                return this.currentRoute === '/'
            }
        },
	})
}