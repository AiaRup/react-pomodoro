import React from 'react';
import playIcon from './icons/play-button.png';
import stopIcon from './icons/stop-button.png';
import restartIcon from './icons/restart-button.png';
import pauseIcon from './icons/pause-button.png';

const ControlButton = (props) => {
  let size = {
    height: props.size,
    width: props.size,
  };

  return (
    <button type='button' className='ControlButton' onClick={props.handleClick} style={size}>
      {props.children}
    </button>
  );
};

const ButtonsWrapper = (props) => {
  return (
    <div className='control-Container'>
      <ControlButton size='50px' handleClick={props.restart}>
        <img src= {restartIcon} alt="restart-Icon" />
      </ControlButton>
      <ControlButton size='60px' handleClick={props.isCounting ? props.pause : props.start}>
        { props.isCounting ?
          <img src= {pauseIcon} alt="pause-Icon" /> :
          <img src= {playIcon} alt="play-Icon" />
        }
      </ControlButton>
      <ControlButton size='50px' handleClick={props.stop}>
        <img src= {stopIcon} alt="stop-Icon" />
      </ControlButton>
    </div>
  );
};

export default ButtonsWrapper;