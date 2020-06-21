import api from '../api'

export default {
    state: {
        cards: [],
    },
    mutations: {
        setCards(state, payload) {
                state.cards = payload
        },
        addCard(state, payload) {
            state.cards = [...state.cards, payload]
        },
        deleteCard(state, payload) {
            
            const idx = state.cards.findIndex(el => el.id === payload)
            state.cards = [...state.cards.slice(0, idx), ...state.cards.slice(idx + 1)]
        },
        updateCardsColumn(state, payload) {
            const { value,  row } = payload
            const temp = state.cards.filter(card => +card.row !== row)
            state.cards = [...temp, ...value]
        }
    },
    actions: {
        async getCards({ commit, getters }) {

                try {
                    const response = await api.get('/cards/', {
                        headers: {
                            'Authorization': `JWT ${getters.token}`
                        }
                    })

                    commit('setCards', response.data)
                } catch (err) {
                    console.log(err.message)
                }          
        },
        async createCard({ commit, getters }, payload) {

            try {
                const response = await api.post('/cards/', payload, {
                    headers: {
                        'Authorization': `JWT ${getters.token}`,
                        'Content-Type': 'application/json',
                    },
                })

                commit('addCard', response.data)
            } catch(err) {
                console.log(err.message)
            }
        },
        async deleteCard({ commit, getters }, payload) {
            try {
                await api.delete(`/cards/${payload}/`, {
                    headers: {
                        'Authorization': `JWT ${getters.token}`,
                    }
                })

                commit('deleteCard', payload)
            } catch (err) {
                console.log(err.message)
            }
        },
        async updateCards({ getters  }, {value, row}) {
            for (let i = 0; i < value.length; i++) {
                const payload = {
                    row,
                    seq_num: i,
                    text: value[i].text
                }
    
                try {
                    await api.patch(`/cards/${value[i].id}`, payload, {
                        headers: {
                            'Authorization': `JWT ${getters.token}`,
                            'Content-Type': 'application/json',
                        },
                    })
    
                } catch(err) {
                    console.log(err.message)
                }
            }
        }
    },
    getters: {
        cards(state) {
            return state.cards
        },
        cardsByRow(state) {
            return row => {
                return state.cards.filter(el => +el.row === row)
            }
        },
        countCardsByRow(state) {
            return row => {
                const column = state.cards.filter(el => +el.row === row)
                return column.length
            }
        },
    }
}