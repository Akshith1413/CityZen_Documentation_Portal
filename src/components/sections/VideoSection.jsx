import React, { useRef, useState } from 'react';
import './VideoSection.css';

const CLOUD = 'https://res.cloudinary.com/dsvc9y4rq/video/upload';
const VIDEO_SRC = `${CLOUD}/q_auto/v1792828798/cityzen-walkthrough.mp4`;
const POSTER_SRC = `${CLOUD}/so_5,w_1280,q_auto/v1792828798/cityzen-walkthrough.jpg`;

const fmt = (s) => {
  if (!Number.isFinite(s)) return '00:00';
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const fullscreen = () => videoRef.current?.requestFullscreen?.();

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
          <div className="vs-video-container" onClick={togglePlay}>
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              preload="metadata"
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            />

            {!isPlaying && (
              <div className="vs-play-overlay">
                <div className="vs-play-btn font-condensed">PLAY FILM</div>
              </div>
            )}
          </div>

          <div className="vs-controls font-mono">
            <button className="vs-control-btn" onClick={togglePlay}>
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <div className="vs-timeline" onClick={seek}>
              <div
                className="vs-timeline-progress"
                style={{ width: duration ? `${(current / duration) * 100}%` : '0%' }}
              ></div>
            </div>
            <div className="vs-time text-secondary">{fmt(current)} / {fmt(duration)}</div>
            <button className="vs-control-btn" onClick={fullscreen}>FULLSCREEN</button>
          </div>

        </div>

      </div>
    </section>
  );
};
