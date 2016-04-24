//node modules
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//local
import * as actions from '../actions/index';
import { VALID_DEPOSIT_RANGE, VALID_WITHDRAWAL_RANGE } from '../actions/index';
import TransactionForm from '../components/deposit_form';
import Menu from '../components/menu';
import TransactionHistory from '../components/transaction_history';

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

  content() {
    if(this.state.menuItemSelected === DEPOSIT) {
      return (
        <TransactionForm
          onSubmit={this.submitDeposit.bind(this)}
          cancel={this.returnToTransactionHistory.bind(this)}
          title="Deposit Form"
          validRange={VALID_DEPOSIT_RANGE}
          />
      );
    }
    else if(this.state.menuItemSelected === WITHDRAW) {
      return (
        <TransactionForm
          onSubmit={this.submitWithdrawal.bind(this)}
          cancel={this.returnToTransactionHistory.bind(this)}
          title="Withdrawal Form"
          validRange={VALID_WITHDRAWAL_RANGE}
          />
      );
    }
    else {
      return (
        <TransactionHistory transactions={this.props.transactions} />
      );
    }
  }

  render() {
    return (
      <div className="manage_account">
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
