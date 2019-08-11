import React, { PureComponent } from "react";
import dateFns from "date-fns";
import endOfDay from "date-fns/end_of_day"
import isWithinRange from "date-fns/is_within_range";
import Modal from "../Modal/Modal";
import { getReminders } from '../actions';
import Header from './Header';
import Cells from './Cells';
import { connect } from 'react-redux';

import './calendar.css';

export class Calendar extends PureComponent {
  state = {
    reminders: [],
    currentMonth: new Date(),
    selectedDate: undefined,
    showModal: false
  };

  componentDidMount() {
    this.props.getReminders();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items.length === 0 || this.state.reminders.length == 0) {
      this.setState({ reminders: this.props.items });
    }
  }

  renderHeader() {
    return (
      <Header prevMonth={this.prevMonth} nextMonth={this.nextMonth}
        currentMonth={this.state.currentMonth} />
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];
    const startDate = dateFns.startOfWeek(this.state.currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  showModal = async (day) => {
    await this.setState({
      selectedDate: dateFns.format(day, "DD/MM/YYYY")[0],
      showModal: !this.state.showModal
    });
  };

  renderCells() {
    const { currentMonth, selectedDate, reminders } = this.state;
    return (
      <Cells currentMonth={currentMonth} selectedDate={selectedDate} reminders={reminders}
        onDateClick={this.onDateClick}></Cells>
    );
  }

  nextMonth = async () => await this.setState({ currentMonth: dateFns.addMonths(this.state.currentMonth, 1) });
  prevMonth = () => this.setState({ currentMonth: dateFns.subMonths(this.state.currentMonth, 1) });

  onDateClick = day => {
    this.showModal(day);
    this.setState({ selectedDate: dateFns.format(day, "DD/MM/YYYY") });
  };

  onClose = () => this.setState({ showModal: false });

  updateReminder = (message) => {
    const { reminders, selectedDate } = this.state;
    const index = reminders.findIndex(item => item.date === selectedDate);
    const updatedData = index === -1 ? [...reminders, { date: selectedDate, message }]
      : reminders.map(obj => obj.date === selectedDate ? ({ date: obj.date, message }) : obj);
    this.setState({ reminders: updatedData, showModal: false })
  }

  onDelete = () => {
    const reminders = this.state.reminders.filter(item => item.date !== this.state.selectedDate);
    this.setState({ reminders, showModal: false })
  }

  render() {
    const { showModal } = this.state;
    const selectedDate = (this.state.reminders.filter(obj => obj.date === this.state.selectedDate) || []);
    const isDateExist = selectedDate.length > 0;

    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        <Modal isDateExist={isDateExist} show={showModal} updateReminder={this.updateReminder} onDelete={this.onDelete}
          onClose={this.onClose} message={selectedDate[0] && selectedDate[0].message}></Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.reminders
  };
};


export default connect(mapStateToProps, { getReminders })(Calendar);

