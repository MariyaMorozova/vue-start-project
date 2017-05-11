import template from './index.pug'
import TodoItem from './../todo-item'
import TodoAdd from './../todo-add'

import {mapGetters, mapActions} from 'vuex'

export default {
    template,
    components: {
        'todo-item': TodoItem,
        'todo-add': TodoAdd
    },
    computed: {
        ...mapGetters(['todoList', 'completedTodoList', 'uncompletedTodoList'])
    },
    methods: {
        ...mapActions(['addTodo', 'changeTodo', 'removeTodo']),

        addTodoItem(newItem) {
            this.addTodo({
                userId: this.$store.state.userInfo.user.uid,
                todoObj: { title: newItem, complete: false, date: new Date() }
            })
        },
        changeTodoItem(todoObj, newTitle, newCompleted) {
            if(newTitle !== ''){
                this.changeTodo({
                    userId: this.$store.state.userInfo.user.uid,
                    todoObj: Object.assign({}, todoObj, {title: newTitle, complete: newCompleted})
                })
            }
        },
        removeTodoItem(todoId) {
            this.removeTodo({
                userId: this.$store.state.userInfo.user.uid,
                todoId
            })
        },
        selectAllTodoList() {
            this.uncompletedTodoList.forEach((todoObj) => {
                this.changeTodoItem(todoObj, todoObj.title, true);
            })
        },
        removeAllCompleteTodoList() {
            this.completedTodoList.forEach((todoObj) => {
                this.removeTodoItem(todoObj.id)
            })
        }
    }
}