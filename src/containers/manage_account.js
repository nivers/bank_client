//node modules
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//local
import { depositFunds, withdrawFunds } from '../actions/index';
import { VALID_DEPOSIT_RANGE, VALID_WITHDRAWAL_RANGE } from '../actions/index';
import TransactionForm from '../components/transaction_form';
import Menu from '../components/menu';
import TransactionHistory from '../components/transaction_history';

const actions = { depositFunds, withdrawFunds };

//menu options
const DEPOSIT = 'Deposit Funds';
const WITHDRAW = 'Withdraw Funds';

const MENU_OPTIONS = [ DEPOSIT, WITHDRAW ];

class ManageAccount extends Component {
  constructor() {
    super();

    this.state = {
      menuItemSelected: undefined,
    };
  }

  returnToTransactionHistory() {
    this.setState({ menuItemSelected: undefined });
  }

  submitDeposit(amount) {
    this.props.depositFunds(amount);

    this.returnToTransactionHistory();
  }

  submitWithdrawal(amount) {
    this.props.withdrawFunds(amount);

    this.returnToTransactionHistory();
  }

  depositForm() {
    return (
      <TransactionForm
        onSubmit={this.submitDeposit.bind(this)}
        cancel={this.returnToTransactionHistory.bind(this)}
        title="Deposit Form"
        min={VALID_DEPOSIT_RANGE[0]}
        max={VALID_DEPOSIT_RANGE[1]}
        />
    );
  }

  withdrawForm() {
    const { balance } = this.props;
    const maxWithdraw = VALID_WITHDRAWAL_RANGE[1];

    //if the account balance is less than the max allowed withdraw ammount, then the form should permit values no higher than the current balance
    const maxValidVal = (maxWithdraw > balance) ? balance : maxWithdraw;

    return (
      <TransactionForm
        onSubmit={this.submitWithdrawal.bind(this)}
        cancel={this.returnToTransactionHistory.bind(this)}
        title="Withdrawal Form"
        min={VALID_WITHDRAWAL_RANGE[0]}
        max={maxValidVal}
        validRange={maxValidVal}
        />
    );
  }

  content() {
    if(this.state.menuItemSelected === DEPOSIT) {
      return this.depositForm();
    }
    else if(this.state.menuItemSelected === WITHDRAW) {
      return this.withdrawForm();
    }
    else {
      return (
        <TransactionHistory transactions={this.props.transactions} />
      );
    }
  }

  render() {
    return (
      <div className="manage-account">
        <div>
          Balance: ${this.props.balance.toFixed(2)}
        </div>

        <Menu
          options={MENU_OPTIONS}
          currentSelection={this.state.menuItemSelected}
          onSelect={(selection) => this.setState({ menuItemSelected: selection })}
          />

        {this.content()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    balance: state.balance,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
