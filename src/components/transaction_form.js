//node modules
import React, { Component, PropTypes } from 'react';

//local
import MoneyInput from './money_input';
import SubmitButton from './submit_button';

export default class TransactionForm extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      touched: false
    }
  }

  hasValidInput() {
    const { inputValue } = this.state;

    const integerRegex = /^\d+$/;
    if(!integerRegex.test(inputValue)) {
      return false;
    }

    const { min, max } = this.props;
    const numericValue = Number(inputValue);

    return (numericValue >= min && numericValue <= max);
  }

  updateValue(event) {
    event.preventDefault();

    this.setState({
      inputValue: event.target.value,
      touched: true
    });
  }

  submit(event) {
    event.preventDefault();

    const submitedValue = this.state.inputValue;
    if(this.hasValidInput(submitedValue)) {
      this.props.onSubmit(Number(submitedValue));
    }
  }

  cancel(event) {
    event.preventDefault();
    this.props.cancel();
  }

  render() {
    const inputValid = this.hasValidInput(this.state.inputValue);

    return (
      <form className="deposit-form form" onSubmit={this.submit.bind(this)}>
        <h2>
          {this.props.title}
        </h2>

        <MoneyInput
          value={this.state.inputValue}
          onChange={this.updateValue.bind(this)}
          error={this.state.touched && !inputValid}
          />
        <SubmitButton
          disabled={!inputValid}
          text="Submit"
          />
        <button className="ui button" onClick={this.cancel.bind(this)}>
          Cancel
        </button>
      </form>
    );
  }
}

TransactionForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

TransactionForm.defaultProps = {
  min: 0,
  max: 1000000,
  validRange: [0, 10000]
}
