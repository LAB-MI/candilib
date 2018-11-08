import { Component } from 'react';
import PropTypes from 'prop-types';
import { setInStorage, getFromStorage } from '../../util/storage';

const KEYSTORAGETOKEN = 'candilib';
const DEFAULT_REDIRECT = '/sites';

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
    fetch(`/api/users/validate_token?token=${tokenToSend}`)
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
          router.push({
            pathname: '/',
            state: { error: 'token_no_valid' },
          });
        }
      })
      .catch(() => {
        router.push({
          pathname: '/',
          state: { error: 'unknown' },
        });
      });
  }
  render() {
    return null;
  }
}

Auth.propTypes = {
  location: PropTypes.isRequired,
  router: PropTypes.isRequired,
};

export default Auth;
