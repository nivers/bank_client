//npm
import chai, { expect } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

//local
import SubmitButton from '../../src/components/submit_button';

describe('<SubmitButton>', () => {

  describe('Not disabled', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<SubmitButton onClick={onClick} />);

    const expectedClasses = 'ui primary button'.split(' ');
    it(`Should have classes ${expectedClasses.join(', ')}`, () => {
      expectedClasses.forEach(className => {
        expect(wrapper.find(`.${className}`)).to.have.length(1);
      });
    });

    it('Has a button that triggers the callback provided in props', () => {
      wrapper.find('button').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
    });

    const expectedDefaultText = 'Submit';
    it(`Has text ${expectedDefaultText} by defaul`, () => {
      expect(wrapper.text()).to.equal(expectedDefaultText);
    });

    it('Has custom text if "text" prop provided', () => {
      const customText = 'Custom Text';
      const newProps = { text: customText };
      wrapper.setProps(newProps);
      expect(wrapper.text()).to.equal(customText);
    });
  });

  describe('Disabled', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<SubmitButton onClick={onClick} disabled={true} />);

    const expectedClasses = 'ui disabled primary button'.split(' ');
    it(`Should have classes ${expectedClasses.join(', ')}`, () => {
      expectedClasses.forEach(className => {
        expect(wrapper.find(`.${className}`)).to.have.length(1);
      });
    });

    it('Has a button that does NOT trigger the callback in props', () => {
      wrapper.find('button').simulate('click');
      expect(onClick.called).to.equal(false);
    });

    const expectedDefaultText = 'Submit';
    it(`Has text ${expectedDefaultText} by defaul`, () => {
      expect(wrapper.text()).to.equal(expectedDefaultText);
    });

    it('Has custom text if "text" prop provided', () => {
      const customText = 'Custom Text';
      const newProps = { text: customText };
      wrapper.setProps(newProps);
      expect(wrapper.text()).to.equal(customText);
    });
  });
});
