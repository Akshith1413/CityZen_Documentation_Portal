import React from 'react';
import './ui.css';

// Renders a real asset from /public/images. Sizing mirrors MediaPlaceholder
// (fills its parent) so the section layouts and animations stay unchanged.

const MediaImage = ({ src, alt, className = '', fit = 'cover', position = 'center', ...props }) => {
  return (
    <div className={`media-image ${className}`} {...props}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        style={{ objectFit: fit, objectPosition: position }}
      />
    </div>
  );
};

export default MediaImage;
