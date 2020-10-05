import axios from 'axios'

const url = 'http://localhost:3002';


export const getUsers = () => {
    return axios.get(url + '/users')
}

export const createUser = (data) => {
    return axios.post(url + '/users', data)
}
export const updateUser = (userId, data) => {
    return axios.put(url + '/users/' + userId, data)
}

export const delUser = (userId) => {
    return axios.delete(url + '/users/' + userId)

}