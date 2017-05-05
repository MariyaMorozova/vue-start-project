import template from './index.pug'
import AuthProvider from './../../libs/auth.js'

export default {
    template,
    data() {
        return {
            auth: new AuthProvider(),
            email: '',
            password: '',
            isSubmitCreate: false,
            isSubmitLogin: false
        }
    },
    computed: {
        isNewLogin: function () {
            return this.$root.currentRoute === '/login'

        },
        isErrorLogin: function () {
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            let res = !reg.test(this.email)

            if (this.isNewLogin) res = res && this.isSubmitLogin
                else res = res && this.isSubmitCreate
            return res;
        },
        isErrorPass: function () {
            let res = !(this.password.length > 6)

            if (this.isNewLogin) res = res && this.isSubmitLogin
            else res = res && this.isSubmitCreate

            return res
        }
    },
    methods: {
        switchLoginOrCreate() {
            if (this.$root.currentRoute === '/login') this.$root.href = '/create-login';
            if (this.$root.currentRoute === '/create-login') this.$root.href = '/login';
            this.$root.go()

        },
        signIn() {
            this.isSubmitLogin = true
            if (this.isErrorLogin || this.isErrorPass) return

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
            this.isSubmitCreate = true
            const authData = { email: this.email, password: this.password}
            this.auth.createUser(authData)
                .then(user => window.location.href = '/')
        }
    }
}