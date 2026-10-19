import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import './GeometryExperience.css';
import { sceneMotion } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export const GeometryExperience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = sceneMotion(containerRef, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: true,
          pin: true,
        }
      });

      // 1. Initial photo State
      tl.to('.geo-photo', {
        rotationX: 60,
        rotationZ: -45,
        scale: 0.8,
        duration: 1,
        ease: 'power1.inOut'
      })
      .fromTo('.geo-plane-grid', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '<0.5')
      
      // 2. Extract Boundary
      .to('.geo-photo', { opacity: 0, duration: 0.5 })
      .fromTo('.geo-boundary', 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 1 }, 
        '<'
      )
      
      // 3. Project to Ground Plane (Orthographic feeling)
      .to('.geo-boundary', {
        borderColor: 'var(--accent-primary)',
        boxShadow: '0 0 20px rgba(142, 18, 58, 0.4)',
        duration: 1
      })
      .fromTo('.geo-math-labels', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '<')

      // 4. Reveal Measurements
      .fromTo('.geo-measure-width', { width: 0, opacity: 0 }, { width: '100%', opacity: 1, duration: 1 })
      .fromTo('.geo-measure-length', { height: 0, opacity: 0 }, { height: '100%', opacity: 1, duration: 1 }, '<')
      .fromTo('.geo-stats', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, stagger: 0.2 });

    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="geometry" className="viewport-section geo-section" ref={containerRef}>
      <div className="archive-container geo-container">
        
        <div className="geo-header">
          <h2 className="font-display uppercase tight-tracking">
            A PHOTO<br/>BECOMES A<br/>MEASUREMENT.
          </h2>
          <div className="geo-meta font-mono text-secondary">
            <strong>GEOMETRY PIPELINE</strong><br/>
            SAM3 Rim Segmentation<br/>
            Pinhole Camera Model<br/>
            Shoelace Formula (Area)<br/>
            PCA (Width / Length)
          </div>
        </div>

        <div className="geo-visual">
          <div className="geo-3d-stage">
            <div className="geo-plane-grid"></div>
            
            <div className="geo-photo">
              <MediaPlaceholder label="STREET VIEW" metadata="GEO-01" />
            </div>

            <div className="geo-boundary">
              <div className="geo-measure-width">
                <span className="font-mono">W: 1.2m</span>
              </div>
              <div className="geo-measure-length">
                <span className="font-mono">L: 0.8m</span>
              </div>
            </div>

            <div className="geo-math-labels font-mono text-tertiary">
              <div className="geo-label-h">h = 1.4m (assumed)</div>
              <div className="geo-label-t">θ = 35° (default tilt)</div>
            </div>
          </div>
        </div>

        <div className="geo-stats font-mono">
          <div className="geo-stat geo-stats-1">
            <span className="geo-stat-label">AREA</span>
            <span className="geo-stat-val">0.96 <small>m²</small></span>
          </div>
          <div className="geo-stat geo-stats-2">
            <span className="geo-stat-label">EST. DEPTH</span>
            <span className="geo-stat-val text-accent">SEVERE</span>
          </div>
        </div>

      </div>
    </section>
  );
};
