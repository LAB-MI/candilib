import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Header from '../../components/Header/Header';


test('renders the header properly', t => {
  const wrapper = shallow(<Header />);
  t.true(wrapper.hasClass('header'));
});
