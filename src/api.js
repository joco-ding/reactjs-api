import axios from 'axios'

const { create } = axios

const headers = {
  'Accept': 'application/json'
}

const api = create({
  baseURL: 'https://demo-app-1.jocodev.id',
  headers
})

export const ApiPost = async(path, data) => await api.post(path, data, {headers: {...headers, 'Content-Type': 'application/json'}})

export const ApiGet = async(path) => await api.get(path)