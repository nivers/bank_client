//npm
import chai from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import jsdom from 'jsdom';
const mockDock = ('<!doctype html><html><body></body></html>');
global.document = jsdom.jsdom(mockDock);
global.window = global.document.defaultView;

import jquery from 'jquery';
const $ = jquery(global.window);

import chaiJquery from 'chai-jquery';
chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props) {
  const componentInstance = TestUtils.renderIntoDocument(
    <ComponentClass {...props} />
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

export default renderComponent;
