import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProblemStatement.css';

gsap.registerPlugin(ScrollTrigger);

export const ProblemStatement = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const statements = gsap.utils.toArray('.problem-statement');
      
      statements.forEach((stmt, i) => {
        gsap.fromTo(stmt, 
          { opacity: 0, y: 100, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            scrollTrigger: {
              trigger: stmt,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1
            }
          }
        );

        // Fade out as it goes up
        gsap.to(stmt, {
          opacity: 0.1,
          scale: 0.9,
          scrollTrigger: {
            trigger: stmt,
            start: 'top 20%',
            end: 'top -20%',
            scrub: 1
          }
        });
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" className="viewport-section problem-section" ref={containerRef}>
      <div className="archive-container">
        <h2 className="problem-title font-display uppercase tight-tracking">
          WHEN EVERY REPORT<br />
          LOOKS EQUALLY URGENT,<br />
          NONE OF THEM ARE.
        </h2>

        <div className="problem-list">
          <div className="problem-statement ps-1">
            <div className="ps-num font-mono">01</div>
            <h3 className="ps-heading font-condensed">MANUAL REVIEW</h3>
            <p className="ps-desc font-serif">"Checking whether a report is genuine takes time."</p>
          </div>

          <div className="problem-statement ps-2">
            <div className="ps-num font-mono">02</div>
            <h3 className="ps-heading font-condensed">NO CONSISTENT PRIORITY</h3>
            <p className="ps-desc font-serif">"Not every complaint needs the same response."</p>
          </div>

          <div className="problem-statement ps-3">
            <div className="ps-num font-mono">03</div>
            <h3 className="ps-heading font-condensed">DUPLICATE NOISE</h3>
            <p className="ps-desc font-serif">"Ten reports can describe one physical problem."</p>
          </div>

          <div className="problem-statement ps-4">
            <div className="ps-num font-mono">04</div>
            <h3 className="ps-heading font-condensed">VISIBILITY GAP</h3>
            <p className="ps-desc font-serif">"A citizen submits a complaint.<br/>Then the system becomes opaque."</p>
          </div>
        </div>
      </div>
    </section>
  );
};
