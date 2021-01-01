import { createStore } from 'vuex'

export default createStore({
    state: {
        menulist: '/home/welcome'
    },
    mutations: {
        changemenu(state, item) {
            state.menulist = '/home/' + item;
            console.log(state.menulist);
        }
    },
    actions: {},
    modules: {}
})