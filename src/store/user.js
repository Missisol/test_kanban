import api from '../api'

export default {
    state: {
        username: 'user001',
        password: 'us12er34001',
        token: '',
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        }
    },
    actions: {
        async obtainToken({ state, commit }) {
            
            const body = {
                username: state.username,
                password: state.password,
            }

            try {
                const response = await api.post('/users/login/', body)
                commit('setToken', response.data.token)
            } catch(err) {
                console.log(err.message)
            }
        },
        async refreshToken({ state, commit }, ) {

            try {
                const response = await api.post('/users/refresh_token/', {token: state.token})
                commit('setToken', response.data.token)

            } catch(err) {
                console.log(err.message)
            }
        },
    },
    getters: {
        token(state) {
            return state.token
        },
        username(state) {
            return state.username
        },
        password(state) {
            return state.password
        },
    }
}