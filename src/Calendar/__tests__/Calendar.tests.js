import React from 'react';
import "babel-polyfill";

import { Calendar } from '../Calendar';
import { shallow } from 'enzyme';

const data = [
    {
        "date": "09/08/2019",
        "message": "Birthday"
    },
    {
        "date": "10/08/2019",
        "message": "New Year"
    }
];

describe('calendar', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    const tree = shallow(<Calendar getReminders={jest.fn()} items={data} />);
    const instance = tree.instance();
    const currentMonth = new Date("2019-05-10");
    instance.setState({ currentMonth });

    test('renders correctly', async () => {
        //Calendar Snapshot
        expect(tree).toMatchSnapshot();

        //header snapshot
        expect(instance.renderHeader()).toMatchSnapshot();

        //Cells snapshost
        expect(instance.renderCells()).toMatchSnapshot();
    });

    test('renders nextMonth', async () => {
        await instance.nextMonth();
        const month = new Date(instance.state.currentMonth)
        expect(month.getMonth() + 1).toEqual(6);
    });

    test('renders prevMonth', async () => {
        await instance.prevMonth();
        const month = new Date(instance.state.currentMonth)
        expect(month.getMonth()).toEqual(4);
    });

    test('selected Date', async () => {
        const currentDate = new Date("2019-05-10");
        await instance.onDateClick(currentDate);
        const date = new Date(instance.state.selectedDate)
        expect(date.getDate()).toEqual(5);
    });

    test('add Reminder', async () => {
        await instance.updateReminder("welcome");
        const length = instance.state.reminders.length;
        expect(length).toEqual(3);
        expect(instance.state.reminders[length - 1].message).toEqual("welcome");
    });

    test('update Reminder', async () => {
        await instance.updateReminder("welcome123");
        const length = instance.state.reminders.length;
        expect(length).toEqual(3);
        expect(instance.state.reminders[length - 1].message).toEqual("welcome123");
    });

    test('delete Reminder', async () => {
        const currentDate = new Date("2019-05-10");
        await instance.onDelete(currentDate);
        const length = instance.state.reminders.length;
        expect(length).toEqual(2);
    });
});