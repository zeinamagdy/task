import React, { useState } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import { addUser, editUser } from '../../../store/actions'
import { Button, Modal, Form } from 'react-bootstrap'
import Calendar from '../../UI/calendar/calendar'
import Select from '../../UI/select/select'
import { updatedObject } from '../../../util/helper'
import './userForm.scss'

const UserForm = (props) => {
    const genders = { 'm': 'Male', 'w': 'Female' }
    const [validated, setValidated] = useState(false);
    let user = props.data || {}

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
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
        setValidated(true);
    };



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
            'birthday': moment ? moment.format('YYYY-MM-DD') : ''
        }
    }
    const handleLastContact = (moment) => {
        user = {
            ...user,
            'lastContact': moment ? moment.toJSON() : ''
        }
    }
    const handleCustomerLifetime = (e) => {
        user = {
            ...user,
            'customerLifetimeValue': e.target.value !== '' ? e.target.value : 0
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter first name"
                                defaultValue={user.name ? user.name.first : ""}
                                onChange={e => handelFirstname(e)} />
                            <Form.Control.Feedback type="invalid">
                                Please enter first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter last name"
                                defaultValue={user.name ? user.name.last : ""}
                                onChange={e => handleLastname(e)} />
                            <Form.Control.Feedback type="invalid">
                                Please enter last name.
                            </Form.Control.Feedback>
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
                                date={user.lastContact ?
                                    Moment(user.lastContact).format('YYYY-MM-DD HH:mm:ss A') : ''}
                                placeholder="Last contact"
                                change={handleLastContact}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCustomerLifetime">
                            <Form.Label>Customer lifetime</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter customer lifetime value"
                                defaultValue={user.customerLifetimeValue || 0}
                                onChange={e => handleCustomerLifetime(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGender">
                            <Select
                                title="Genders"
                                data={genders}
                                initialValue={user.gender || ""}
                                change={e => handleChangeGender(e)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.onClose}  >
                            Close
                            </Button>
                        <Button variant="primary" type='submit'>
                            Save
                            </Button>
                    </Modal.Footer>
                </Form>

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