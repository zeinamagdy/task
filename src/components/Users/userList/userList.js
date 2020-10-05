import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, deleteUser } from '../../../store/actions'
import User from '../user/user'
import Snackbar from '../../UI/snackbar/snackbar'
import UserForm from '../../userForm/userForm'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Pagination from '@material-ui/lab/Pagination'
import { FaPen } from 'react-icons/fa'



import * as classes from './userList.module.scss'

const UserList = (props) => {
    const { getUsers } = props
    const [message, setMessage] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        getUsers()
    }, [getUsers])

    // console.log("calling api", props.users)
    const handleCloseSnackbar = () => {
        setMessage({})
    }
    const handleClose = () => {
        setShowForm(false)
    }
    const handleChangePage = (event, newPage) => {
        console.log('newPage', newPage);
        setPage(newPage);
    };

    const startIdx = (page - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;

    return (
        <>
            <div className={classes.userList}>
                {props.loading ? <div>Loaading</div> :
                    props.users.slice(startIdx, endIdx).map((user, index) =>
                        <User
                            key={index}
                            handleDeleteUser={(id) => props.deleteUser(user.customerID)}
                            user={user}
                        />)}

                <Pagination
                    count={Math.ceil(props.users.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined"
                    color="primary" />
                <div className={classes.userList__add}>
                    <Fab color="primary" aria-label="add" onClick={() => setShowForm(true)}>
                        <AddIcon />
                    </Fab>
                </div>

            </div>

            {Object.keys(message).length !== 0 ?
                <Snackbar message={message} onClosed={handleCloseSnackbar} /> : null}
            {showForm ? <UserForm mode='edit' onClose={handleClose} show={showForm} /> : null}

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