import template from './index.pug'

export default {
    template,
    data() {
        return {
            editMode: false,
            deleteMode: false,
            changedTitle: ''
        }
    },
    props: ['todoObj'],
    methods: {
        clickEdit() {
            this.editMode = !this.editMode
            this.changedTitle = this.todoObj.title
            setTimeout(() => {
                document.getElementById('todo-input' + this.todoObj.id).focus()
            }, 0)
        },
        cancelModes() {
            this.editMode = false
            this.deleteMode = false

        },
        confirmEditOrDelete() {
            if (this.editMode) {
                this.editMode = false
                this.$emit('change', this.todoObj, this.changedTitle, this.todoObj.complete)
            }
            if (this.deleteMode) this.$emit('remove', this.todoObj.id)

        },
        setCompleted() {
            this.$emit('change', this.todoObj, this.todoObj.title, !this.todoObj.complete)
        }
    }
}