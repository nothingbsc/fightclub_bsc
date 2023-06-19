import { useState } from 'react';
import './App.css';
import React from 'react';
import Faucet from './components/faucet';
import VideoLoader from './components/video-loader';


function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate a delay to showcase the loading screen
    setTimeout(() => {
      setIsLoading(false);
    }, 16000);
  }, []);

  return (
    <div>
      {isLoading ? <VideoLoader /> : <Faucet />}
    </div>
  )
}

export default App;
