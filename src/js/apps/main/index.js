import Vue from 'vue'
import Vuex from 'vuex'
import template from './index.pug'

export default () => {

	Vue.use(Vuex)

	const app = new Vue({
		el: '#app',
		template
	})
}