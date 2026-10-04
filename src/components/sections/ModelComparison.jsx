import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ModelComparison.css';

gsap.registerPlugin(ScrollTrigger);

export const ModelComparison = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        }
      });

      tl.fromTo('.mc-quote', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to('.mc-quote', { scale: 0.8, opacity: 0.2, y: -50, duration: 1 })
        
        .fromTo('.mc-models', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, '<')
        .fromTo('.mc-model-1', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '<0.2')
        .fromTo('.mc-model-2', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<0.2')
        .fromTo('.mc-model-3', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '<0.2')
        
        .to('.mc-model-2, .mc-model-3', { opacity: 0.2, scale: 0.9, duration: 0.5 }, '+=0.5')
        .to('.mc-model-1', { borderColor: 'var(--accent-primary)', scale: 1.05, duration: 0.5 }, '<');

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="models" className="viewport-section mc-section" ref={containerRef}>
      <div className="archive-container mc-container">
        
        <div className="mc-quote-container">
          <h2 className="mc-quote font-serif">
            "A bounding box can tell us where the problem is.<br/>
            <span className="text-accent">It cannot describe its real outline.</span>"
          </h2>
        </div>

        <div className="mc-models">
          
          <div className="mc-model mc-model-1">
            <h3 className="font-display">SAM3</h3>
            <ul className="font-mono text-secondary">
              <li>pixel-level mask</li>
              <li>zero-shot</li>
              <li>shape / geometry</li>
            </ul>
            <div className="mc-model-status text-accent font-condensed uppercase">SELECTED</div>
          </div>

          <div className="mc-model mc-model-2">
            <h3 className="font-display">YOLO11</h3>
            <ul className="font-mono text-secondary">
              <li>bounding box</li>
              <li>training data</li>
              <li>fast real-time detection</li>
            </ul>
            <div className="mc-model-status font-condensed uppercase">REJECTED</div>
          </div>

          <div className="mc-model mc-model-3">
            <h3 className="font-display">RF-DETR</h3>
            <ul className="font-mono text-secondary">
              <li>bounding box</li>
              <li>training data</li>
              <li>real-time / open license</li>
            </ul>
            <div className="mc-model-status font-condensed uppercase">REJECTED</div>
          </div>

        </div>

      </div>
    </section>
  );
};
