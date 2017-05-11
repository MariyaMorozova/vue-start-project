import {mapActions} from 'vuex'
import template from './index.pug'
import UserInfo from './../../../components/user-info'
import TodoList from './../../../components/todo-list'


export default {
    template,
    components: {
        'user-info': UserInfo,
        'todo-list': TodoList
    },
    data() {
        return {
            todoPreloader: true
        }
    },
    methods: {
        ...mapActions(['getUser', 'getTodoList'])
    },
    beforeMount() {
        const _this = this
        this.getUser()
        this.$store.subscribe(function (mutation, state) {
            if (mutation.type === 'setUser') {
                state.userInfo.user.uid ? _this.getTodoList(state.userInfo.user.uid) : _this.todoPreloader = false
            }
            if (mutation.type === 'setTodoList') _this.todoPreloader = false
        })
    }
}