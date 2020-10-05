import *  as actions from './actions'
import { getUsers, delUser, createUser, updateUser } from '../../util/api'

export const fetchUsersStart = () => {
    return {
        type: actions.FETCH_USERS_START,
    }
}
export const fetchUsersSuccess = (data) => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        users: data
    }
}
export const fetchUsersFail = (error) => {
    return {
        type: actions.FETCH_USERS_FAIL,
        error: error
    }
}
export const addUserSuccess = (data) => {
    return {
        type: actions.ADD_USER_SUCCESS,
        USERS: data,
    }
}
export const updateUserScuccess = (user) => {
    return {
        type: actions.UPDATE_USER_SUCCESS,
        user: user
    }
}
export const deleteUserScuccess = id => {
    return {
        type: actions.DELETE_USER_SUCCESS,
        id: id
    }
}
export const fetchUsers = () => {
    return dispatch => {
        getUsers().then(response => {
            dispatch(fetchUsersSuccess(response.data))
        }).catch(error => {
            dispatch(fetchUsersFail)
        })
    }
}
export const addUser = (user) => {
    return dispatch => {
        createUser(user)
            .then(response => {
                dispatch(addUserSuccess(user))
            })
            .catch(err => {
                dispatch(fetchUsersFail(err))
            })
    }
}
export const editUser = (user) => {
    return dispatch => {
        updateUser(user.customerID, user)
            .then(response => {
                console.log(response)
                dispatch(updateUserScuccess(user))
            })
    }
}
export const deleteUser = (id) => {
    return dispatch => {
        delUser(id)
            .then(response => {
                dispatch(deleteUserScuccess(id))
            }).catch((error => {
                console.log('error', error)
            }))
    }
}
