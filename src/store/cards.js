import api from '../api'

export default {
    state: {
        cards: [
            [], [], [], [],
        ],
    },
    mutations: {
        setCards(state, payload) {
            payload.map(card => {
                state.cards[+card.row].push(card)
            })
        },
        addCard(state, payload) {
            state.cards[+payload.row].push(payload)
        },
        deleteCard(state, payload) {
            const { id, row } = payload
            
            const idx = state.cards[+row].findIndex(el => el.id === id)
            state.cards[+row].splice(idx, 1)
        },
        updateCardsColumn(state, {value, row}) {
            const length = state.cards[row].length
                state.cards[row].splice(0, length)
                state.cards[row].push(...value)
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
            const { id } = payload
            try {
                await api.delete(`/cards/${id}/`, {
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
            const payload = {
                row,
                seq_num: value.seq_number,
                text: value.text
            }

            try {
                await api.patch(`/cards/${value.id}`, payload, {
                    headers: {
                        'Authorization': `JWT ${getters.token}`,
                        'Content-Type': 'application/json',
                    },
                })

            } catch(err) {
                console.log(err.message)
            }


        }
    },
    getters: {
        cards(state) {
            return state.cards
        },
        cardsByRow(state) {
            return row => {
                return state.cards[row]
            }
        },
        countCardsByRow(state) {
            return row => {
                return state.cards[row].length
            }
        },
    }
}