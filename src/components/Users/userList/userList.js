import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, deleteUser } from '../../../store/actions'
import User from '../user/user'
import Snackbar from '../../UI/snackbar/snackbar'
import Spinnner from '../../UI/spinner/spinner'
import UserForm from '../userForm/userForm'
import Pagination from '@material-ui/lab/Pagination'
import * as classes from './userList.module.scss'

const UserList = (props) => {
    const { getUsers } = props
    const [showForm, setShowForm] = useState(false)
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const startIdx = (page - 1) * rowsPerPage
    const endIdx = startIdx + rowsPerPage

    useEffect(() => {
        getUsers()
    }, [getUsers])

    // console.log("calling api", props.users)
    const handleClose = () => {
        setShowForm(false)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    console.log('users', props.users)
    let users = props.users.length > 0 ?
        <div className={classes.userList}>
            {props.users.slice(startIdx, endIdx).map((user, index) =>
                <User
                    key={index}
                    handleDeleteUser={(id) => props.deleteUser(user.customerID)}
                    user={user}
                />)}
            <div className={classes.userList__paging}> <Pagination
                count={Math.ceil(props.users.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                color="primary"
            /></div>
        </div> : <div>No users</div>

    return (
        <Fragment>
            {props.loading ? <Spinnner /> : users}
            {props.message !== '' ? <Snackbar message={props.message} /> : null}
            {showForm ? <UserForm mode='add' onClose={handleClose} show={showForm} /> : null}
        </Fragment>
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
        loading: state.loading,
        message: state.message
    }
}

export default connect(stateToProps, dispatchToProps)(UserList);