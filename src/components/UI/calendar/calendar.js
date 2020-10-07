// https://www.npmjs.com/package/react-datetime
import React from 'react'
import 'react-datetime/css/react-datetime.css'
import Datetime from 'react-datetime'


const Calendar = (props) => {
    return <Datetime
        value={props.date}
        inputProps={{ placeholder: props.placeholder }}
        timeFormat={props.timeFormat}
        onChange={props.change}
        closeOnTab={true}
    />

}
export default Calendar;