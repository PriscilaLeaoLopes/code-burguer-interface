import axios from 'axios'

export const apiCodeBurguer = axios.create({
    baseUrl: 'http://localhost:3001'
})

export default apiCodeBurguer