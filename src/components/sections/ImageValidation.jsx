import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaImage from '../ui/MediaImage';
import './ImageValidation.css';
import { sceneMotion } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export const ImageValidation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = sceneMotion(containerRef, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });

      tl.to('.iv-scanner', { top: '100%', duration: 2, ease: 'none' })
        .to('.iv-mask-reveal', { height: '100%', duration: 2, ease: 'none' }, '<')
        .fromTo('.iv-annotation-1', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, 0.5)
        .fromTo('.iv-annotation-2', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, 1.0)
        .fromTo('.iv-result', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, 1.8);

    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="validation" className="viewport-section iv-section" ref={containerRef}>
      <div className="archive-container iv-container">
        <div className="iv-text-col">
          <h2 className="font-display uppercase tight-tracking iv-headline">
            THE PHOTO<br/>HAS TO TELL<br/>THE SAME STORY.
          </h2>
          <div className="iv-pipeline font-mono text-secondary">
            <div className="iv-step">CITIZEN PHOTO</div>
            <div className="iv-arrow">↓</div>
            <div className="iv-step">CLOUDINARY</div>
            <div className="iv-arrow">↓</div>
            <div className="iv-step text-primary">ROBOFLOW / SAM3</div>
            <div className="iv-arrow">↓</div>
            <div className="iv-step">DETECTED CATEGORY</div>
          </div>
        </div>

        <div className="iv-visual-col">
          <div className="iv-image-container">
            {/* Base Image */}
            <MediaImage src="/images/validation/val-original.jpg" alt="Original citizen photo of a pothole" className="iv-base" />
            
            {/* Mask layer */}
            <div className="iv-mask-reveal">
              <div className="iv-mask-content">
                <MediaImage src="/images/validation/val-sam3-mask.png" alt="Pothole photo with SAM3 segmentation mask overlay" className="iv-segmented" />
              </div>
            </div>

            {/* Scanner line */}
            <div className="iv-scanner"></div>
            
            {/* Annotations */}
            <div className="iv-annotation iv-annotation-1 font-mono">
              <span>DECLARED</span>
              <strong>POTHOLE</strong>
            </div>
            
            <div className="iv-annotation iv-annotation-2 font-mono">
              <span>DETECTED</span>
              <strong>POTHOLE</strong>
              <span className="text-secondary">CONFIDENCE: 94%</span>
            </div>

            <div className="iv-result font-condensed text-accent">
              MATCH CONFIRMED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
