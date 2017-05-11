import firebase from 'firebase'
const SET_TODO_LIST = 'setTodoList'

export default {
    state: {
        todoList: []
    },
    getters: {
        todoList: state => ([ ...state.todoList ]),
        completedTodoList: state => ([...state.todoList].filter(function(key){
            return key.complete == true;
        })),
        uncompletedTodoList: state => ([...state.todoList].filter(function(key){
            return key.complete == false;
        }))
    },
    mutations: {
        [SET_TODO_LIST](state, todoList) {
            state.todoList = Object.values(todoList)
        }
    },
    actions: {
        getTodoList({commit}, userId) {
            firebase.database().ref(`/users/${userId}/todoList`).on('value', snap => {
                commit(SET_TODO_LIST, snap.val() || {})
            })

        },
        addTodo({commit}, payload) {
            const newKey = firebase.database().ref(`/users/${payload.userId}/`).child('todoList').push().key
            payload.todoObj.id = newKey
            firebase.database().ref(`/users/${payload.userId}/`).update({[`/todoList/${newKey}`]: payload.todoObj})

        },
        changeTodo({commit}, payload){
            firebase.database().ref(`/users/${payload.userId}/`).update({[`/todoList/${payload.todoObj.id}`]: payload.todoObj})

        },
        removeTodo({commit}, payload) {
            firebase.database().ref(`/users/${payload.userId}/`).update({[`/todoList/${payload.todoId}`]: null})

        }
    }
}
