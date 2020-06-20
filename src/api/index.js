import axios from 'axios'

const url = 'https://trello.backend.tests.nekidaem.ru/api/v1'
export default axios.create({
    baseURL: url,
})