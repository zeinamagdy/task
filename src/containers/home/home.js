import React, { useState } from 'react'
import UserList from '../../components/Users/userList/userList'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import * as classes from './home.module.scss'

const Home = () => {
    return (
        <div className={classes.home}>
            <div className={classes.sidebar}>
                sideBar
            </div>
            <header className={classes.header}>
                <h4>User list</h4>
                <IconButton aria-label="add" >
                    <AddIcon onClick={() => console.log('add')} />
                </IconButton>
            </header>
            <div className={classes.main}>
                <UserList />
            </div>
        </div>
    )
}

export default React.memo(Home);