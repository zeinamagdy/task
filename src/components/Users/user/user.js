import React, { useState } from 'react'
import UserForm from '../userForm/userForm'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import CakeIcon from '@material-ui/icons/Cake'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import * as classes from './user.module.scss'
import Moment from 'moment'

const User = props => {
    const [showForm, setShowForm] = useState(false)
    const handleClose = () => {
        setShowForm(false)
    }
    return (
        <div key={props.user.customerID} className={classes.user}>
            <div>{props.user.name.first}&nbsp;{props.user.name.last}</div>
            <div className={classes.user__birthday}>
                <CakeIcon />{props.user.birthday ? props.user.birthday : 'No birthday provided'}
            </div>
            <div className={classes.user__lastContact}>
                <CalendarIcon />
                {props.user.lastContact ?
                    Moment(props.user.lastContact).format('YYYY-MM-DD HH:mm:ss A') :
                    'No time Contact provided'}
            </div>
            <div>
                {props.user.customerLifetimeValue ? props.user.customerLifetimeValue : 0}
            </div>
            <div className={classes.user__icons}>
                <Tooltip title="Delete">
                    <IconButton
                        aria-label="delete"
                        onClick={props.handleDeleteUser}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton
                        aria-label="Edit"
                        onClick={() => setShowForm(true)} >
                        < EditIcon />
                    </IconButton>
                </Tooltip>
                {showForm ?
                    <UserForm
                        mode='edit'
                        show={showForm}
                        data={props.user}
                        onClose={handleClose}
                    /> : null}
            </div>
        </div>
    )
}

export default User;