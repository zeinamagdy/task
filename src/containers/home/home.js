import React, { useState } from 'react'
import UserList from '../../components/Users/userList/userList'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import UserForm from '../../components/Users/userForm/userForm'
import * as classes from './home.module.scss'

const Home = () => {
    const [showForm, setShowForm] = useState(false)
    const handleClose = () => {
        setShowForm(false)
    }
    return (
        <div className={classes.home}>
            <header className={classes.header}>
                <h4>User list</h4>
                <div className={classes.header__add}>
                <Fab color="primary" aria-label="add" onClick={() => setShowForm(true)}>
                    <AddIcon />
                </Fab>
            </div>
            </header>
            <div className={classes.main}>
                <UserList />
            </div>
            {showForm ? <UserForm mode='add' onClose={handleClose} show={showForm} /> : null}
        </div>

    )
}

export default React.memo(Home);