import React from 'react'
import { Form } from 'react-bootstrap'

const Select = (props) => {
    return (
        <Form.Group controlId="formSelect" >
            <Form.Label>{props.title}</Form.Label>
            <Form.Control
                as="select"
                placeholder="Type"
                onChange={props.change}
                defaultValue={props.initialValue}
                custom>
                <option disabled={true} value="">
                    Select gender
                </option>
                {Object.keys(props.data).map(el =>
                    <option key={el} value={el}>
                        {props.data[el]}
                    </option>
                )}
            </Form.Control>
        </Form.Group>)
}
export default Select