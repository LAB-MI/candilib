import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Footer } from '../../components/Footer/Footer';

test('renders the footer properly', t => {
  const wrapper = shallow(
    <Footer classes={{ footer: 'footer' }} />
  );
  t.true(wrapper.hasClass('footer'));
  t.is(wrapper.find('p').length, 1);
  t.is(wrapper.find('p').first().text().startsWith('© 2018 · Candilib.'), true);
});
