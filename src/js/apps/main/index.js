import Vue from 'vue'
import Vuex from 'vuex'
import Todo from './../../components/todo/'
import NotFound from './../../components/not-found/'
import UserInfo from './../../components/user-info/'
import template from './index.pug'

export default () => {

	Vue.use(Vuex)

	const app = new Vue({
		el: '#app',
		template,
        components: {
			'user-info': UserInfo,
            todo: Todo,
            'not-found': NotFound
        },
        data() {
            return {
                currentRoute: window.location.pathname
            }
        },
		computed: {
            isTodoComponent() {
                return this.currentRoute === '/'
            }
        },
	})
}