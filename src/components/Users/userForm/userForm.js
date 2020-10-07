import React from 'react'
import { connect } from 'react-redux'
import { addUser, editUser } from '../../../store/actions'
import { Button, Modal, Form } from 'react-bootstrap'
import Calendar from '../../UI/calendar/calendar'
import Select from '../../UI/select/select'
import Moment from 'moment'


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
        user = {
            ...user,
            "name": { ...user.name, 'first': e.target.value }
        }

    }
    const handleLastname = (e) => {
        user = {
            ...user,
            "name": { ...user.name, 'last': e.target.value }
        }

    }
    const handleChangeGender = (e) => {
        user = {
            ...user,
            'gender': e.target.value
        }
    }

    const handleBirthday = (moment) => {
        user = {
            ...user,
            'birthday': moment.format('YYYY-MM-DD')
        }
    }
    const handleLastContact = (moment) => {
        user = {
            ...user,
            'lastContact': moment.toJSON()
        }
    }
    const handleCustomerLifetime = (e) => {
        user = {
            ...user,
            'customerLifetimeValue': e.target.value
        }

    }
    return (
        <>
            <Modal show={props.show} onHide={props.onClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.mode === 'add' ? 'Add user' : 'Edit user'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
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
                            <Calendar
                                date={user.birthday}
                                timeFormat={false}
                                placeholder="Birthday"
                                change={handleBirthday}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Last contact</Form.Label>
                            <Calendar
                                date={Moment(user.lastContact).format('YYYY-MM-DD HH:mm:ss A')}
                                placeholder="Last contact"
                                change={handleLastContact}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCustomerLifetime">
                            <Form.Label>Customer lifetime</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter customer lifetime value"
                                defaultValue={user.customerLifetimeValue || ""}
                                onChange={e => handleCustomerLifetime(e)} />
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
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
const dispatchToProps = dispatch => {
    return {
        addUser: (user) => dispatch(addUser(user)),
        editUser: (user) => dispatch(editUser(user))
    }
}

export default connect(null, dispatchToProps)(UserForm)