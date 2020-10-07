import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled"  {...props} />
}

const CustomizedSnackbar = (props) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false)
    return (
        <Snackbar
            autoHideDuration={1000}
            open={open }
            onClose={handleClose}>
            <Alert severity='success'>
                {props.message}
            </Alert>
        </Snackbar>
    );
}

export default CustomizedSnackbar;