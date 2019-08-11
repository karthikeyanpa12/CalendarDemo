import React from 'react';
import dateFns from "date-fns";

export default function Cells(props) {
    const { currentMonth, selectedDate, reminders, onDateClick } = props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D", rows = []
    let days = [], day = startDate, formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const selectedDate = reminders.filter(obj => obj.date === dateFns.format(day, "DD/MM/YYYY"));
            const selected = selectedDate.length > 0 ? 'selected' : ''
            const cloneDay = day;
            days.push(
                <div className={`col cell ${selected}`}
                    key={day} onClick={() => onDateClick(dateFns.parse(cloneDay))}>
                    <span className="number">{formattedDate}</span>
                    <span className="message">{selectedDate && selectedDate[0] && selectedDate[0].message}</span>
                </div>);
            day = dateFns.addDays(day, 1);
        }
        rows.push(<div className="row" key={day}>  {days}</div>);
        days = [];
    }
    return <div className="body">{rows}</div>;
}