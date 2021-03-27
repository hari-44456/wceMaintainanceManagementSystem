import React from 'react';

import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';
function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>WCE Managment System</h1>
      <p>All Query Will Be solved..!</p>
      <div className='hero-btns'>
      <Link to='/ui/home'>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </Link>
        
        
      </div>
    </div>
  );
}

export default HeroSection;
