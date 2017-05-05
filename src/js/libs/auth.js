import firebase from 'firebase'

export default class Auth {
    constructor() {
        this.dbAuth = firebase.auth();
    }

    setUser(user = {}) {
        this.user = {
            photo: user.photoURL,
            email: user.email,
            name: user.displayName,
            id: user.uid,
            token: user.refreshToken
        }
    }

    getUser() {
        return new Promise((resolve, reject) => {
            this.dbAuth.onAuthStateChanged(user => {
                if (!user) {
                    reject({ status: 403, message: 'Forbidden' })
                } else {
                    this.setUser(user)
                    resolve(this.user)
                }
            })
        })
    }

    createUser(authData = {}) {
        return new Promise((resolve, reject) => {
            this.dbAuth.createUserWithEmailAndPassword(authData.email, authData.password)
                .then(user => {
                    this.setUser(user)
                    resolve(this.user)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    signIn(authData = {}) {
        return new Promise((resolve, reject) => {
            this.dbAuth.signInWithEmailAndPassword(authData.email, authData.password)
                .then(user => {
                    this.setUser(user)
                    resolve(this.user)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    signInGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        return new Promise((resolve, reject) => {
            this.db.auth().signInWithPopup(provider)
                .then(user => {
                    this.setUser(user)
                    resolve(this.user)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    signInFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        return new Promise((resolve, reject) => {
            this.db.auth().signInWithPopup(provider)
                .then(user => {
                    this.setUser(user)
                    resolve(this.user)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    signInGithub(){
        var provider = new firebase.auth.GithubAuthProvider();
        return new Promise((resolve, reject) => {
            this.db.auth().signInWithPopup(provider)
                .then(user => {
                    this.setUser(user)
                    resolve(this.user)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    signOut() {
        return new Promise((resolve, reject) => {
            this.dbAuth.signOut()
                .then(() => {
                    this.setUser()
                    resolve(this.user)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}