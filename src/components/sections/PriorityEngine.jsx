import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PriorityEngine.css';

gsap.registerPlugin(ScrollTrigger);

export const PriorityEngine = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });

      // Signals enter
      tl.fromTo('.pe-signal-1', { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0)
        .fromTo('.pe-signal-2', { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.2)
        .fromTo('.pe-signal-3', { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.4)
        .fromTo('.pe-signal-4', { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.6)
        
        // Funnel down
        .to('.pe-signal', { y: 200, scale: 0.5, opacity: 0, duration: 1, stagger: 0.1 }, 1.5)
        
        // Show Score
        .fromTo('.pe-score-container', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 2)
        .fromTo('.pe-band', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 2.5);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="priority" className="viewport-section pe-section" ref={containerRef}>
      <div className="archive-container pe-container">
        
        <div className="pe-header">
          <h2 className="font-display uppercase tight-tracking">
            NOT ALL<br/>COMPLAINTS<br/>DESERVE THE<br/>SAME RESPONSE.
          </h2>
          <div className="pe-ahp-meta font-mono text-secondary">
            <strong>Analytic Hierarchy Process (AHP)</strong><br/>
            pairwise comparisons<br/>
            criticality scores<br/>
            relative weights<br/>
            Consistency Ratio: CR = 0.000
          </div>
        </div>

        <div className="pe-visual">
          <div className="pe-signals">
            <div className="pe-signal pe-signal-1 font-mono">
              <span className="pe-weight">43%</span>
              <span className="pe-label">IMAGE EVIDENCE</span>
            </div>
            <div className="pe-signal pe-signal-2 font-mono">
              <span className="pe-weight">33%</span>
              <span className="pe-label">INFRASTRUCTURE PROXIMITY</span>
            </div>
            <div className="pe-signal pe-signal-3 font-mono">
              <span className="pe-weight">14%</span>
              <span className="pe-label">TEXT EMOTION</span>
            </div>
            <div className="pe-signal pe-signal-4 font-mono">
              <span className="pe-weight">10%</span>
              <span className="pe-label">COMMUNITY VOTES</span>
            </div>
          </div>

          <div className="pe-funnel-line"></div>

          <div className="pe-score-container">
            <div className="pe-score-value font-display text-accent">87<span className="pe-percent">%</span></div>
            <div className="pe-band font-condensed uppercase text-accent">CRITICAL PRIORITY</div>
          </div>
        </div>

      </div>
    </section>
  );
};
