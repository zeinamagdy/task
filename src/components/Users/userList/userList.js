import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, deleteUser } from '../../../store/actions'
import User from '../user/user'
import Snackbar from '../../UI/snackbar/snackbar'
import * as classes from './userList.module.scss'

const UserList = (props) => {
    const { getUsers } = props
    const [message, setMessage] = useState({})

    useEffect(() => {
        getUsers()
    }, [getUsers])

    console.log("calling api", props.users)
    const handleCloseSnackbar = () => {
        setMessage({})
    }

    console.log('rendering');
    return (
        <>
            <div className={classes.userList}>
                {props.loading ? <div>Loaading</div> :
                    props.users.map((user, index) =>
                        <User
                            key={index}
                            handleDeleteUser={(id) => props.deleteUser(user.customerID)}
                            user={user}
                        />)}
            </div>
            {Object.keys(message).length !== 0 ?
                <Snackbar message={message} onClosed={handleCloseSnackbar} /> : null}
        </>

    )
}
const dispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(fetchUsers()),
        deleteUser: (id) => dispatch(deleteUser(id))
    }
}
const stateToProps = state => {
    return {
        users: state.users,
        loading: state.loading
    }
}
export default connect(stateToProps, dispatchToProps)(UserList);