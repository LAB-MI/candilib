import React from 'react';
import PropTypes from 'prop-types';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { App } from '../App';
import { toggleAddPost } from '../AppActions';
import { CssBaseline } from '@material-ui/core';

const children = <h1>Test</h1>;
const dispatch = sinon.spy();
const props = {
  children,
  dispatch,
  classes: {
    footer: 'footer',
  },
};

test('renders properly', t => {
  const wrapper = shallow(
    <App {...props} />
  );

  // t.is(wrapper.find('Helmet').length, 1);
  t.is(wrapper.find('Header').length, 1);
});

test('calls componentDidMount', t => {
  const wrapper = shallow(
    <App {...props} />,
    {
      context: {
        router: {
          isActive: sinon.stub().returns(true),
          push: sinon.stub(),
          replace: sinon.stub(),
          go: sinon.stub(),
          goBack: sinon.stub(),
          goForward: sinon.stub(),
          setRouteLeaveHook: sinon.stub(),
          createHref: sinon.stub(),
        },
      },
      childContextTypes: {
        router: PropTypes.object,
      },
    },
  );

  t.truthy(wrapper.find(CssBaseline).length, 1);
});
