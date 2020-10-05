import React from 'react'
import { Form } from 'react-bootstrap'


const Select = (props) => {

    return (
        <Form.Group controlId="formSelect">
            <Form.Label>{props.title}</Form.Label>
            <Form.Control as="select" onChange={props.onChange} custom>
                <option selected>Select Gender</option>
                {Object.keys(props.data).map(el => <option value={el}>{props.data[el]}</option>)}
            </Form.Control>
        </Form.Group>)

}
export default Select