import axios from 'axios'

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url ='http://localhost:3000'
} else {
    url = ''
}

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