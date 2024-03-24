import axios from 'axios'

const ApiHandler = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default ApiHandler;