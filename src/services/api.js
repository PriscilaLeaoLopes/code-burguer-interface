import axios from 'axios'

export const apiCodeBurguer = axios.create({
    baseURL: 'http://localhost:3001'
})

apiCodeBurguer.interceptors.request.use(async config => {
    const userData = await localStorage.getItem('codeburguer:userData')
    const token = JSON.parse(userData).token
    config.headers.authorization = 'Bearer ${token}'
    return config
})

export default apiCodeBurguer