import React, { Component } from "react";
import ReactDOM from "react-dom";
import Calendar from "./Calendar/Calendar";
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    return (<Provider store={store}>
        <Calendar />
    </Provider>)
}
ReactDOM.render(<App />, document.getElementById("root"));