import React, { useRef, useState } from 'react';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import './VideoSection.css';

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      // In a real app: videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // In a real app: videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="video" className="viewport-section vs-section">
      <div className="archive-container vs-container">
        
        <div className="vs-header">
          <h2 className="font-display uppercase tight-tracking">
            SEE CITYZEN<br/>IN MOTION
          </h2>
          <p className="font-serif text-secondary mt-4">Documentary Archive / 23CSE498</p>
        </div>

        <div className="vs-player">
          {/* Main video area */}
          <div className="vs-video-container" onClick={togglePlay}>
            {/* The user will swap this with a real <video> tag pointing to /assets/cityzen-demo.mp4 */}
            <MediaPlaceholder 
              label={isPlaying ? "PLAYING: cityzen-demo.mp4" : "PAUSED: cityzen-demo.mp4"} 
              type="video" 
              metadata="VID-01" 
            />
            
            {!isPlaying && (
              <div className="vs-play-overlay">
                <div className="vs-play-btn font-condensed">PLAY FILM</div>
              </div>
            )}
          </div>

          {/* Custom Controls UI */}
          <div className="vs-controls font-mono">
            <button className="vs-control-btn" onClick={togglePlay}>
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <div className="vs-timeline">
              <div className="vs-timeline-progress" style={{ width: isPlaying ? '45%' : '0%' }}></div>
            </div>
            <div className="vs-time text-secondary">01:24 / 03:45</div>
            <button className="vs-control-btn">CC</button>
            <button className="vs-control-btn">FULLSCREEN</button>
          </div>

        </div>

      </div>
    </section>
  );
};
