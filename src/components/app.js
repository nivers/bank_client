import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="ui container">
        {this.props.children}
      </div>
    );
  }
}
