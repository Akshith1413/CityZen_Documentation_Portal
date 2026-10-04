import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import './Observation.css';

gsap.registerPlugin(ScrollTrigger);

export const Observation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        }
      });

      // Initially headline is centered. Move it up.
      tl.to('.obs-headline', { top: '15%', duration: 1, ease: 'power2.inOut' })
        
        // Main image enters from bottom and scales up
        .fromTo('.obs-main-image', 
          { y: 400, scale: 0.5, opacity: 0 }, 
          { y: 0, scale: 0.8, opacity: 1, duration: 1, ease: 'power2.out' }, 
          '<'
        )
        
        // Extract signals (happens AFTER image enters)
        .to('.signal-image', { x: -300, y: -200, opacity: 1, duration: 1 })
        .to('.signal-text', { x: 300, y: -200, opacity: 1, duration: 1 }, '<')
        .to('.signal-location', { x: -300, y: 200, opacity: 1, duration: 1 }, '<')
        .to('.signal-community', { x: 300, y: 200, opacity: 1, duration: 1 }, '<')

        // Hold
        .to({}, { duration: 0.5 })

        // Converge to Priority
        .to(['.signal-image', '.signal-text', '.signal-location', '.signal-community', '.obs-main-image'], {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.1
        })
        .to('.obs-priority-result', {
          opacity: 1,
          scale: 1,
          duration: 1
        }, '-=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="observation" className="viewport-section obs-section" ref={containerRef}>
      <div className="archive-container obs-container">
        <h2 className="font-display uppercase tight-tracking obs-headline">
          ONE INCIDENT.<br/>MANY SIGNALS.
        </h2>

        <div className="obs-interactive-area">
          <div className="obs-main-image">
            <MediaPlaceholder label="RAW CITIZEN REPORT" metadata="OBS-01" />
          </div>

          <div className="obs-signal signal-image font-mono">
            <span>01</span>
            <strong>IMAGE</strong>
            <span>Visual Evidence</span>
          </div>

          <div className="obs-signal signal-text font-mono">
            <span>02</span>
            <strong>TEXT</strong>
            <span>Authenticity / Emotion</span>
          </div>

          <div className="obs-signal signal-location font-mono">
            <span>03</span>
            <strong>LOCATION</strong>
            <span>Spatial Evidence</span>
          </div>

          <div className="obs-signal signal-community font-mono">
            <span>04</span>
            <strong>COMMUNITY</strong>
            <span>Social Evidence</span>
          </div>

          <div className="obs-priority-result font-display text-accent">
            PRIORITY
          </div>
        </div>
      </div>
    </section>
  );
};
