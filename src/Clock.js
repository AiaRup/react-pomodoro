import React from 'react';

const Clock = (props) => {
  let seconds = props.seconds < 10 ? `0${props.seconds}` : props.seconds;

  return (
    <div className='Clock-content'>
      <h2>{props.headline}</h2>
      <h1>{props.minutes}:{seconds}</h1>
    </div>
  );
};

export default Clock;

