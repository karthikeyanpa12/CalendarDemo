import React from 'react';
import dateFns from "date-fns";

export default function header(props) {
    const dateFormat = "MMMM YYYY";
    const { prevMonth, currentMonth, nextMonth } = props;
    return (
        <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={prevMonth}> Previous</div>
            </div>
            <div className="col col-center">
                <span>{dateFns.format(currentMonth, dateFormat)}</span>
            </div>
            <div className="col col-end" onClick={nextMonth}>
                <div className="icon">Next</div>
            </div>
        </div>
    );
}