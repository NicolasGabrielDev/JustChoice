import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const api = axios.create({
    baseURL: 'http://whispering-stream-90983.herokuapp.com',
    withCredentials: true,
})

export default api