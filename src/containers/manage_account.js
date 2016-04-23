//node modules
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//local
import * as actions from '../actions/index';

class ManageAccount extends Component {
  render() {
    return (
      <div>
        This was rendered in the manage account container
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
