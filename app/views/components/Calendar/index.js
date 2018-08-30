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
            <BigCalendar
                defaultDate={new Date()}
                step={15}
                timeslots={8}
                defaultView={BigCalendar.Views.WEEK}
                events={events}
            />
        </div>
    }

}