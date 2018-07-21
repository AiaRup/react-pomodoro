import React from 'react';

const RoundBorder = (props) => {
  let styleObj = {
    height: props.size,
    width: props.size,
    border: props.border
  };

  return (
    <div className='RoundBorder' style={styleObj}>
      {props.children}
    </div>
  );
};

export default RoundBorder;