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
    props: ['todoObj', 'disabledButton'],
    methods: {
        clickEdit() {
            this.editMode = !this.editMode
            this.changedTitle = this.todoObj.title
            this.$emit('setDisabled')
            setTimeout(() => {
                document.getElementById('todo-input' + this.todoObj.id).focus()
            }, 0)
        },
        clickDelete() {
            this.deleteMode = !this.deleteMode
            this.$emit('setDisabled')
        },
        cancelModes() {
            this.editMode = false
            this.deleteMode = false
            this.$emit('setDisabled')
        },
        confirmEditOrDelete() {
            this.$emit('setDisabled')
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