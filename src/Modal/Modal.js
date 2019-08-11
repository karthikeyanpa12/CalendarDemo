import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    constructor(props) {
        super();
        this.state = { disabled: false, value: props.message || '' };
    }

    componentDidUpdate = (prevProps) => {
        const { message = '' } = this.props;
        if (prevProps.message !== message || (!!message && this.state.value === '')) {
            this.setState({ value: message });
        }
    }

    clearData = () => {
        this.setState({ value: '', disabled: false });
    }

    onClose = e => {
        this.clearData();
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

    onSubmit = async () => {
        const { value } = this.state;
        await this.props.updateReminder(value);
        await this.clearData();
    }

    onDelete = () => {
        this.props.onDelete();
    }

    render() {
        const { isDateExist, id } = this.props;
        const { disabled, value } = this.state;

        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal" id={id}>
                <h2>Events</h2>
                <div className="content">
                    <textarea type="text" value={value} onChange={this.handleChange} />
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