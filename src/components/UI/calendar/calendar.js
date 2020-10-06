// https://www.npmjs.com/package/react-datetime
import React from 'react'
import 'react-datetime/css/react-datetime.css'
import Datetime from 'react-datetime'

const Calendar = (props) => {

    return <Datetime
        closeOnSelect={true}
        value={props.date}
        inputProps={{ placeholder: props.placeholder }}
        timeFormat={props.timeFormat}
        onChange={props.change} />;
}
export default Calendar;