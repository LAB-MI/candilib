import React from 'react';
import PropTypes from 'prop-types';

const styleEvent = {
  flex: 1,
  left: 0,
  fontSize: 10,
};


const CreneauEvent = (props) => {

  return (
    < span style={styleEvent} >
      <p>{props.event.title}</p>
    </span >
  );
};

CreneauEvent.propTypes = {
  event: PropTypes.object,
};

export default CreneauEvent;
