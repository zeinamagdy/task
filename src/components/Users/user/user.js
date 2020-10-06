import React, { useState } from 'react'
import { FaTrash, FaBirthdayCake, FaPhone } from 'react-icons/fa'
import UserForm from '../userForm/userForm'
import Fab from '@material-ui/core/Fab'
import Delete from '@material-ui/icons/Delete'
import { FaPen } from 'react-icons/fa'


import * as classes from './user.module.scss'
import Moment from 'moment';

const User = props => {
    const [showForm, setShowForm] = useState(false)
    const handleClose = () => {
        setShowForm(false)
    }
    return (
        <div key={props.user.customerID} className={classes.user}>
            <div>{props.user.name.first}&nbsp;{props.user.name.last}</div>
            <div className={classes.user__birthday}>
                <FaBirthdayCake />{props.user.birthday}
            </div>
            <div className={classes.user__lastContact}>
                <FaPhone /> {Moment(props.user.lastContact).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div>
                {props.user.customerLifetimeValue}
            </div>
            <div className={classes.user__icons}>
                <FaTrash onClick={props.handleDeleteUser} />
                <FaPen onClick={() => setShowForm(true)} />
                {/* <Fab color="secondary" size="small" aria-label="delete" onClick={() => props.handleDeleteUser}>
                    <Delete />
                </Fab> */}
                {showForm ? <UserForm mode='edit' show={showForm} data={props.user} onClose={handleClose} /> : null}
            </div>
        </div>
    )
}

export default User;