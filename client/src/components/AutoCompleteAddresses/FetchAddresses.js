import React from 'react';
import fetch from 'isomorphic-fetch';
import debounce from 'debounce-fn';
import PropTypes from 'prop-types';

class FetchAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adresses: [],
    };
    this.fetchAdressesDebounce = debounce(this.fetchAdresses, { wait: 300 });
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props;
    if (prevProps.search !== search) {
      this.fetchAdressesDebounce(search);
    }
  }

  fetchAdresses(search) {
    if (search) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${search}`)
        .then(response => response.json())
        .then(adresses => {
          this.setState({ adresses: adresses.features });
        });
    } else {
      this.setState({ adresses: [] });
    }
  }

  render() {
    return this.props.children(this.state);
  }
}

FetchAddresses.propTypes = {
  search: PropTypes.string,
  children: PropTypes.func,
};

export default FetchAddresses;
