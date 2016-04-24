//node modules
import React, { Component, PropTypes } from 'react';

//local
import { VALID_DEPOSIT_RANGE } from '../actions';
import MoneyInput from './money_input';
import SubmitButton from './submit_button';

function isValidInput(value) {
  const integerRegex = /^\d+$/;

  if(!integerRegex.test(value)) {
    return false;
  }

  const numericValue = Number(value);
  return (numericValue >= VALID_DEPOSIT_RANGE[0] && numericValue <= VALID_DEPOSIT_RANGE[1]);
}

export default class DepositForm extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      touched: false
    }
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
    if(isValidInput(submitedValue)) {
      this.props.onSubmit(Number(submitedValue));
    }
  }

  render() {
    const inputValid = isValidInput(this.state.inputValue);

    return (
      <form className="deposit-form form">
        <MoneyInput
          value={this.state.inputValue}
          onChange={this.updateValue.bind(this)}
          error={this.state.touched && !inputValid}
          />
        <SubmitButton
          onClick={this.submit.bind(this)}
          disabled={!inputValid}
          />
      </form>
    );
  }
}

DepositForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
