import * as actions from '../actions/actions'

const updatedObject = (oldObj, updatedProps) => {
    return {
        ...oldObj,
        ...updatedProps
    }
}

const intialState = {
    users: [],
    loading: true,
    message: ''
}

const fetchUsersStart = (state) => {
    return updatedObject(state, { loading: true })
}
const fetchUserSucess = (state, action) => {
    return updatedObject(state, {
        users: action.users,
        loading: false,
    })
}
const fetchUserFail = (state) => {
    return updatedObject(state, { loading: false })
}
const deleteUserSuccess = (state, action) => {
    const newList = state.users.filter(user =>
        user.customerID !== action.id)
    return updatedObject(state, {
        users: newList,
        message: 'User deleted successfully'
    })
}
const updateUserSuccess = (state, action) => {
    console.log('update user', action.user)
    const updatedUsers = state.users.map(obj =>
        obj.customerID === action.user.customerID ? { ...action.user } : obj
    );
    return updatedObject(state,
        {
            users: updatedUsers,
            loading: false,
            message: 'User updated successfully'
        })
}
const addUserSuccess = (state, action) => {
    console.log('user in reducer', action);
    const user = { ...action.user, 'customerID': state.users.length + 1 }
    const newList = state.users.concat(user)
    console.log('new users lIst in reducer', newList)
    return updatedObject(state, {
        users: newList,
        loading: false, message:
            'User added successfully'
    })
}

const userReducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.FETCH_USERS_START: return fetchUsersStart(state)
        case actions.FETCH_USERS_SUCCESS: return fetchUserSucess(state, action)
        case actions.FETCH_USERS_FAIL: return fetchUserFail(state)
        case actions.UPDATE_USER_SUCCESS: return updateUserSuccess(state, action)
        case actions.DELETE_USER_SUCCESS: return deleteUserSuccess(state, action)
        case actions.ADD_USER_SUCCESS: return addUserSuccess(state, action)
        default: return state
    }
}

export default userReducer