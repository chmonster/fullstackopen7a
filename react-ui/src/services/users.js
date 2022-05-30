import axios from 'axios'
const baseUrl = '/api/users'

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject) //username, name, password
  return response.data
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export default { getAll, create, get }
