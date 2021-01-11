import axios from 'axios'

const api = axios.create({
    baseURL: 'http://whispering-stream-90983.herokuapp.com'
})

export default api