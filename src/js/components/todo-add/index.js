import template from './index.pug'

export default {
    template,
    data() {
        return {
            newItem: ''
        }
    },
    methods: {
        addTodo() {
            this.$emit('create', this.newItem)
            this.newItem = ''
        }
    }
}
