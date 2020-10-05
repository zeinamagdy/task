import React from 'react'
import Snackbar  from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled"  {...props} />
}

const CustomizedSnackbar = (props) => {
    const handleClose = () => props.onClosed()

    return (
        <Snackbar
            autoHideDuration={1000}
            onClose={handleClose}
            open={true} >
            <Alert severity={props.message.type}>
                
                    {props.message.body}
                
            </Alert>
        </Snackbar>
    );
}

export default CustomizedSnackbar;