import React from 'react';
import './ui.css';

// TODO: Replace with real project assets later by removing the placeholder and rendering an <img> or <video>.
// The user will map these based on the `src` prop or just swap the component.

const MediaPlaceholder = ({ type = 'image', label = 'IMAGE PLACEHOLDER', metadata = '01', className = '', ...props }) => {
  return (
    <div className={`media-placeholder ${className}`} {...props}>
      <div className="media-placeholder-inner">
        <div className="media-placeholder-top">
          <span className="font-mono text-secondary">MEDIA / {metadata}</span>
        </div>
        <div className="media-placeholder-center">
          <h4 className="font-condensed uppercase tight-tracking placeholder-label">{label}</h4>
          <p className="font-serif placeholder-instruction">Replace with project screenshot</p>
        </div>
        <div className="media-placeholder-bottom">
          <span className="font-mono text-tertiary">{type === 'video' ? 'VIDEO FORMAT .MP4' : 'IMAGE ASSET .JPG / .PNG'}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaPlaceholder;
