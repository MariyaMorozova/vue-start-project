import Vue from 'vue'
import Vuex from 'vuex'
import template from './index.pug'

Vue.use(Vuex)

export default () => {

	const app = new Vue({
		el: '#app',
		template,
		data() {
			return {}
		},
		methods: {}
	})

}