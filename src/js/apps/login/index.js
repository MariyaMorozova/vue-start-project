import Vue from 'vue'
import Vuex from 'vuex'
import routes from './routes'
import Login from './../../components/login/'
import NotFound from './../../components/not-found/'
import template from './index.pug'

Vue.use(Vuex)

export default () => {

	const app = new Vue({
		el: '#app',
        template,
        components: {
		    login: Login,
            'not-found': NotFound
        },
		data() {
			return {
			    currentRoute: window.location.pathname,
                href: '/'
			}
		},
        computed: {
		    isLoginComponent() {
		        return routes[this.currentRoute] === 'login'
            },
		    View() {
		        const matchingView = routes[this.currentRoute]
                if (matchingView === 'root') {
                    this.href = '/login';
                    this.go()
                }
            }
        },
		methods: {
            go (event) {
                if (event) event.preventDefault()
                this.currentRoute = this.href
                window.history.pushState(
                    null,
                    routes[this.href],
                    this.href
                )
            }
		},
        created: function () {
            if (this.View) this.View()
        }
	})

    window.addEventListener('popstate', () => {
        app.currentRoute = window.location.pathname
    })

}