import {mapActions, mapState} from 'vuex'
import template from './index.pug'

export default {
    template,
    methods: {
        ...mapActions(['signOut'])
    },
    computed: mapState({
        user: state => state.userInfo.user
    })
}