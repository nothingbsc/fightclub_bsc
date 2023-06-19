import React from "react";
import Video from  "./first_rule.mp4"
import './App.css';



function VideoLoader() {
    return (
      <div className="spread-video">
        <video src={Video} muted controls autostart autoPlay loop></video>
      </div>
    );
  }
  
  export default VideoLoader;