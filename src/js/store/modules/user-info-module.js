import firebase from 'firebase'
const SET_USER = 'setUser'

export default {
    state: {
        user: {}
    },
    getters: {
        user: state => ({ ...state.user })
    },
    mutations: {
        [SET_USER](state, user) {
            state.user = {
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                email: user.email
            }
        },
    },
    actions: {
        getUser({commit}) {
            firebase.auth().onAuthStateChanged(user => {
                commit(SET_USER, user || {})
            })
        },
        signOut({commit}) {
            firebase.auth().signOut().then(() => {
                commit(SET_USER, {})
                window.location.href = '/'
            })
        }
    }

}
