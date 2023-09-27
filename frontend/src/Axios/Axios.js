import axios, { Axios } from 'axios'
const API=axios.create({
    baseURL:"http://localhost:8080/api/books/"
})

export default API