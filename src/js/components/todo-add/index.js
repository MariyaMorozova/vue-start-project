import template from './index.pug'

export default {
    template,
    data() {
        return {
            newItem: ''
        }
    },
    props: ['disabledButton'],
    methods: {
        addTodo() {
            if (this.disabledButton) return
            this.$emit('create', this.newItem)
            this.newItem = ''
        }
    }
}
