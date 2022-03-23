import React from 'react';
import './Marker.css';

const Marker = (props) => {
    const { color, name } = props;
    return (
      <div className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;