import React from 'react';
import SliderInput from './SliderInput';

const SideBar = props => {
  return (
    <div className='Side-bar'>
      <button className="close" onClick={props.toggleSideBar}>&times;</button>
      <SliderInput inputId='Work' defaultValue='25' min='1' max='59' updateDefaultValues={props.updateDefaultValues}/>
      <SliderInput inputId='Break' defaultValue='5' min='1' max='59' updateDefaultValues={props.updateDefaultValues}/>
    </div>
  );
};

export default SideBar;