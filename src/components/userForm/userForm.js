import React from 'react'
import { connect } from 'react-redux'
import { addUser, editUser } from '../../store/actions'
import { Button, Modal, Form } from 'react-bootstrap'
import Calender from '../UI/calender/calender'
// import Calender from '../UI/calenderUi/calenderUi'
import Select from '../UI/select/select'
import { FaPen } from 'react-icons/fa'

// https://www.telerik.com/blogs/how-to-build-forms-with-react-the-easy-way

const UserForm = (props) => {
    const genders = { 'm': 'Male', 'w': 'Female' }
    let user = props.data || {}


    const handleSumbit = () => {
        console.log('sumbit user', user)
        switch (props.mode) {
            case 'add':
                props.addUser(user)
                break;
            case 'edit':
                props.editUser(user)
                break
            default:
                break;
        }
        props.onClose()
    }
    const handelFirstname = (e) => {
        user = { ...user, "name": { ...user.name, 'first': e.target.value } }

    }
    const handleLastname = (e) => {
        user = { ...user, "name": { ...user.name, 'last': e.target.value } }

    }
    const handleChangeGender = (e) => {
        user = { ...user, 'gender': e.target.value }
    }

    const handleBirthday = (moment) => {
        console.log('birth', moment.format('YYYY-MM-D'))
        user = { ...user, 'birthday': moment.format('YYYY-MM-D') }
    }
    return (
        <>
            {/* <FaPen onClick={handleShow} /> */}
            <Modal show={props.show} onHide={props.onClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName" inline>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                defaultValue={user.name ? user.name.first : ""}
                                onChange={e => handelFirstname(e)} />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                defaultValue={user.name ? user.name.last : ""}
                                onChange={e => handleLastname(e)} />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Calender
                                date={user.birthday}
                                change={handleBirthday} />
                        </Form.Group>
                        <Form.Group controlId="formGender">
                            <Select
                                title="Genders"
                                data={genders}
                                initialValue={user.gender || ""}
                                change={e => handleChangeGender(e)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSumbit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
const dispatchToProps = dispatch => {
    return {
        addUser: () => dispatch(addUser()),
        editUser: (user) => dispatch(editUser(user))
    }
}
const stateToProps = state => {
    return {
        users: state.users,
        loading: state.loading
    }
}

export default connect(stateToProps, dispatchToProps)(UserForm)