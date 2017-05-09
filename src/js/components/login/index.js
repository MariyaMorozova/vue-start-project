import template from './index.pug'
import AuthProvider from './../../libs/auth.js'

export default {
    template,
    data() {
        return {
            auth: new AuthProvider(),
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            isSubmitCreate: false,
            isSubmitLogin: false,
            servErr: '',
            isServErrLogin: false,
            isServErrPass: false
        }
    },
    computed: {
        isNewLogin: function () {
            return this.$root.currentRoute === '/login'

        },
        viewErrBlock: function () {
            return this.isErrorLogin || this.isErrorPass || this.isErrRequeredName || this.servErr
        },
        isErrorLogin: function () {
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            let res = !reg.test(this.email)

            if (this.isNewLogin) res = res && this.isSubmitLogin
                else res = res && this.isSubmitCreate
            return res
        },
        isErrorPass: function () {
            let res = !(this.password.length > 6)

            if (this.isNewLogin) res = res && this.isSubmitLogin
            else res = res && this.isSubmitCreate

            return res
        },
        isErrorFirstName: function () {
            return !this.firstName.length && this.isSubmitCreate
        },
        isErrorLastName: function () {
            return !this.lastName.length && this.isSubmitCreate
        },
        isErrRequeredName: function () {
            return (this.isErrorFirstName ||  this.isErrorLastName) && !this.isNewLogin
        },
        fullName: function () {
            return this.firstName + ' ' + this.lastName
        }
    },
    methods: {
        onInputEmail() {
            if (this.isServErrLogin || this.isServErrPass) {
                this.isServErrLogin = false
                this.isServErrPass = false
                this.servErr = ''
            }
        },
        onInputPass() {
            if (this.isServErrPass) {
                this.isServErrPass = false
                this.servErr = ''
            }
        },
        setErrServText(errCode) {
            switch(errCode) {
                case 'auth/user-not-found':
                    this.servErr = 'Пользователя с таким логином не существует. Введите правильно логин или создайте новую учетную запись.'
                    this.isServErrLogin = true
                    break

                case 'auth/wrong-password':
                    this.servErr = 'Неверный пароль. Введите еще раз.'
                    this.isServErrPass = true
                    break

                case 'auth/email-already-in-use':
                    this.servErr = 'Данный логин уже используется. Введите новый.'
                    this.isServErrLogin = true
                    break

                default:
                    this.servErr = 'Что-то пошло не так, попробуйте еще раз.'
                    break
            }
        },
        switchLoginOrCreate() {
            this.servErr = ''
            this.isServErrLogin = false
            this.isServErrPass = false
            if (this.$root.currentRoute === '/login') this.$root.href = '/create-login';
            if (this.$root.currentRoute === '/create-login') this.$root.href = '/login';
            this.$root.go()

        },
        signIn() {
            const _this = this
            this.servErr = ''
            this.isSubmitLogin = true
            if (this.isErrorLogin || this.isErrorPass || this.isServErrLogin || this.isServErrPass) return

            const authData = { email: this.email, password: this.password}
            this.auth.signIn(authData)
                .then(user => window.location.href = '/')
                .catch(function(err) {
                    _this.setErrServText(err.code)
                })
        },
        signInGoogle() {
            const _this = this
            this.auth.signInGoogle()
                .then(user => window.location.href = '/')
                .catch(function(err) {
                    _this.setErrServText(err.code)
                })

        },
        createUser() {
            const _this = this
            this.servErr = ''
            this.isSubmitCreate = true
            if (this.isErrorLogin || this.isErrorPass || this.isErrRequeredName || this.isServErrLogin) return
            const authData = { email: this.email, password: this.password, displayName: this.fullName}
            this.auth.createUser(authData)
                .then(user => window.location.href = '/')
                .catch(function(err) {
                    _this.setErrServText(err.code)
                })
        }
    }
}