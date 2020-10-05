// https://www.npmjs.com/package/react-datetime
import React from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

const Calender = (props) => {

    return <Datetime
        closeOnSelect={true}
        value={props.date}
        inputProps={{ placeholder: "Birthday" }}
        timeFormat={false}
        onChange={props.change} />;
}
export default Calender;