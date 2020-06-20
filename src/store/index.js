import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import cards from './cards'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        cards,
    }
})