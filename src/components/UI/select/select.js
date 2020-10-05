import React from 'react'
import { Form } from 'react-bootstrap'

// validation: https://react-bootstrap-v3.netlify.app/components/forms/
const Select = (props) => {
    console.log(props)
    return (
        <Form.Group controlId="formSelect" >
            <Form.Label>{props.title}</Form.Label>
            <Form.Control
                as="select"
                placeholder="Type"
                onChange={props.change}
                defaultValue={props.initialValue}
                custom>
                <option disabled={true}>Select Gender</option>
                {Object.keys(props.data).map(el => <option value={el}>{props.data[el]}</option>)}
            </Form.Control>
        </Form.Group>)

}
export default Select