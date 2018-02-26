import React from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import './datepicker.css';

var date = new Date();

function onChange(value){
    date = value;
}

const Datepicker = () => (
    <DatePicker
        onChange={onChange}
        value={date}
        isOpen
    />
)

export default Datepicker;