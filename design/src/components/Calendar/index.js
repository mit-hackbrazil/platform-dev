import React, { Component } from "react";
import moment from "moment";
import BigCalendar from 'react-big-calendar';
import { } from "./calendar.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const events = [
    {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
    }
];

export default class Calendar extends Component {

    render() {
        return <div className="main-calendar">
            <iframe
                src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;&amp;src=kglc6gceolerre2i2bmg145i3o%40group.calendar.google.com&amp;color=%23182C57&amp;ctz=America%2FFortaleza"
                width="100%"
                height="400"
                frameborder="0"
                scrolling="yes"></iframe>

        </div >
    }

}