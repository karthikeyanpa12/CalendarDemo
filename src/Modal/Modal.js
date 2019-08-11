import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    state = { disabled: false, value: this.props.message };

    componentDidUpdate(prevProps) {
        const { message } = this.props;
        if (prevProps.message !== message) {
            this.setState({ value: message });
        }
    }

    onClose = e => {
        this.setState({ value: '', disabled: false });
        this.props.onClose && this.props.onClose(e);
    };

    handleChange = (event) => {
        const value = event.target.value;
        if (value.length > 30) {
            this.setState({ disabled: true })
        } else {
            this.setState({ disabled: false, value });
        }
    }

    onSubmit = () => {
        const { value } = this.state;
        this.props.updateReminder(value);
    }

    onDelete = () => {
        this.props.onDelete();
    }

    render() {
        const { isDateExist } = this.props;
        const { disabled } = this.state;

        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal" id="modal">
                <h2>Events</h2>
                <div className="content">
                    <textarea type="text" value={this.state.value} onChange={this.handleChange} />
                    {disabled && "Message Reached Maximum characters"}
                </div>
                <div className="actions">
                    <button className="toggle-button" onClick={this.onClose}>
                        close
                     </button>
                    <button className="toggle-button" onClick={this.onSubmit} disabled={this.state.disabled} >
                        {isDateExist ? 'Update' : 'Submit'}
                    </button>
                    {isDateExist &&
                        <button className="toggle-button" onClick={this.onDelete}>
                            Delete
                    </button>}
                </div>
            </div>
        );
    }
}