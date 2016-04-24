//npm
import chai, { expect } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

//local
import MoneyInput from '../../src/components/money_input';

describe('<MoneyInput>', () => {
  const onChange = sinon.spy();
  const value = 'initial value';
  const wrapper = shallow(<MoneyInput value={value} onChange={onChange} />);

  const expectedClass = 'ui right labeled input';
  it(`Should be of class ${expectedClass}`, () => {
    expectedClass.split(' ').forEach(className => {
      expect(wrapper.hasClass(className)).to.equal(true);
    });
  });

  describe('Children', () => {
    const children = wrapper.children();
    it('Has 3 children', () => {
      expect(children.length).to.equal(3);
    });

    it('First child is div with dollar label', () => {
      const firstChild = wrapper.childAt(0);
      expect(firstChild.is('div')).to.be.true;
      expect(firstChild.hasClass('label')).to.be.true;
      expect(firstChild.text()).to.equal('$');
    });

    it('Second child is an input element with value passed as props.value', () => {
      const secondChild = wrapper.childAt(1);
      expect(secondChild.is('input')).to.be.true;
      expect(secondChild.props().value).to.equal(value);
    });

    it('Third child is div with ".00" label', () => {
      const thirdChild = wrapper.childAt(2);
      expect(thirdChild.is('div')).to.be.true;
      expect(thirdChild.hasClass('label')).to.be.true;
      expect(thirdChild.text()).to.equal('.00');
    });
  });

  describe('Change of input value', () => {
    it('Should tigger props.onChange function', () => {
      const changeVal = 'new input val';
      wrapper.find('input').simulate('change', 'abc');
      expect(onChange.calledOnce).to.equal(true);
    });
  });

  wrapper.setProps( { error: true });
  describe('With error', () => {
    it('Has class "error"', () => {
      expect(wrapper.hasClass('error')).to.be.true;
    });
  });
});
