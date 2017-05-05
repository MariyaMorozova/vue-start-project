import template from './index.pug'
import AuthProvider from './../../libs/auth.js'

export default {
    template,
    data() {
        return {
            auth: new AuthProvider(),
            email: '',
            password: ''
        }
    },
    computed: {
        isNewLogin: function () {
            return this.$root.currentRoute === '/login'

        }
    },
    methods: {
        switchLoginOrCreate() {
            if (this.$root.currentRoute === '/login') this.$root.href = '/create-login';
            if (this.$root.currentRoute === '/create-login') this.$root.href = '/login';
            this.$root.go()

        },
        signIn() {
            const authData = { email: this.email, password: this.password}
            this.auth.signIn(authData)
                .then(user => window.location.href = '/')

        },
        signInGoogle() {
            this.auth.signInGoogle()
                .then(user => window.location.href = '/')

        },
        signInFacebook() {
            this.auth.signInFacebook()
                .then(user => window.location.href = '/')

        },
        signInGithub() {
            this.auth.signInGithub()
                .then(user => window.location.href = '/')

        },
        createUser() {
            const authData = { email: this.email, password: this.password}
            this.auth.createUser(authData)
                .then(user => window.location.href = '/')
        }
    }
}