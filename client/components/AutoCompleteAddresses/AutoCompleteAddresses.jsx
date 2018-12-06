import React from 'react';
import Downshift from 'downshift';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import FetchAddresses from './FetchAddresses.jsx';

import autoCompleteAddressesStyle from './autoCompleteAddressesStyle.js';

class AutoCompleteAddresses extends React.Component {
  render() {
    const { handleChange, classes, inputName, placeholder } = this.props;
    return (
      <Downshift
        onChange={selection =>
          handleChange({
            target: { name: inputName, value: selection.properties.label },
          })
        }
        itemToString={item => (item ? item.properties.label : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <FetchAddresses search={inputValue}>
              {({ adresses }) => (
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor={inputName} {...getLabelProps()}>
                    Adresse
                  </InputLabel>
                  <Input
                    id={inputName}
                    name={inputName}
                    placeholder="10 rue des examens 93000 Bobigny"
                    autoFocus
                    {...getInputProps()}
                    placeholder={placeholder}
                  />
                  {isOpen &&
                  <div className={classes.dropdownWrapper}>
                    <div
                      {...getMenuProps()}
                      className={classes.downshiftDropdown}
                    >
                      {adresses
                        ? adresses.map((item, index) => (
                            <div
                              className={classes.dropdownItem}
                              {...getItemProps({
                                key: index,
                                index,
                                item,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index
                                      ? 'lightgray'
                                      : 'white',
                                },
                              })}
                            >
                              {item.properties.label}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  }
                </FormControl>
              )}
            </FetchAddresses>
          </div>
        )}
      </Downshift>
    );
  }
}

AutoCompleteAddresses.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  handleChange: PropTypes.func,
  adresse: PropTypes.string,
  inputName: PropTypes.string,
};

export default withStyles(autoCompleteAddressesStyle)(AutoCompleteAddresses);
