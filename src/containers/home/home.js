import React from 'react'
import UserList from '../../components/Users/userList/userList'
import * as classes from './home.module.scss'

const Home = () => {
    return (
        <div className={classes.home}>
            <div className={classes.sidebar}>
                sideBar
            </div>
            <header className={classes.header}>
                <h4>User list</h4>
                
            </header>
            <div className={classes.main}>
                <UserList />
                
            </div>
        </div>
    )
}

export default React.memo(Home);