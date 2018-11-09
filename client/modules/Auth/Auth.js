import { Component } from 'react';
import PropTypes from 'prop-types';
import { setInStorage, getFromStorage } from '../../util/storage';
import { DEFAULT_REDIRECT, KEYSTORAGETOKEN } from '../../util/app.constants';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    const { location, router } = this.props;
    const { token, redirect } = location.query;
    let tokenToSend = token;
    if (token === undefined) {
      tokenToSend = getFromStorage(KEYSTORAGETOKEN);
    }
    let url = `/api/users/validate_token?token=${tokenToSend}`;
    if (redirect !== undefined) {
      url = url + `&redirect=${redirect}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.isTokenValid) {
          setInStorage(KEYSTORAGETOKEN, tokenToSend);
          if (redirect === undefined) {
            router.push(DEFAULT_REDIRECT);
          } else {
            router.push(redirect);
          }
        } else {
          router.push('/');
        }
      })
      .catch(() => {
        router.push('/');
      });
  }
  render() {
    return null;
  }
}

Auth.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default Auth;
