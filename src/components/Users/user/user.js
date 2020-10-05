import React from 'react'
import { FaTrash, FaBirthdayCake, FaPhone } from 'react-icons/fa'
import UserForm from '../../userForm/userForm'

import * as classes from './user.module.scss'

const User = props => {


    return (
        <div key={props.user.customerID} className={classes.user}>
            <div>{props.user.name.first}&nbsp;{props.user.name.last}</div>
            <div className={classes.user__birthday}><FaBirthdayCake />{props.user.birthday}</div>
            <div className={classes.user__lastContact}>
                <FaPhone />{props.user.lastContact}
            </div>
            <div>
                {props.user.customerLifetimeValue}
            </div>
            <div className={classes.user__icons}>
                <FaTrash onClick={props.handleDeleteUser} />
                {/* TODO: find best practice to show the form (it's reading every time but hidden)  */}
                <UserForm mode='edit' data={props.user} />
            </div>
        </div>
    )
}

export default User;