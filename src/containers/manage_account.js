//node modules
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//local
import * as actions from '../actions/index';
import Menu from '../components/menu';

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { balance: state.balance };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
