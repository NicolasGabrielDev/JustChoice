import axios from 'axios'

const api = axios.create({
    baseURL: 'http://justchoice.herokuapp.com/'
})

export default api