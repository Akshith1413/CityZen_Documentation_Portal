import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EngineeringDecisions.css';

gsap.registerPlugin(ScrollTrigger);

export const EngineeringDecisions = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.ed-item');
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="engineering" className="viewport-section ed-section" ref={containerRef}>
      <div className="archive-container ed-container">
        
        <div className="ed-header">
          <h2 className="font-display uppercase tight-tracking">
            ENGINEERED,<br/>NOT DECORATED.
          </h2>
        </div>

        <div className="ed-grid">
          
          <div className="ed-item">
            <h3 className="font-condensed uppercase">01 ONE SERVICE PER CONCERN</h3>
            <div className="font-mono text-secondary ed-desc">
              Single shared vote service.<br/>
              Single scoring module.<br/>
              Prevents state desynchronization across the architecture.
            </div>
          </div>

          <div className="ed-item">
            <h3 className="font-condensed uppercase">02 RELIABILITY WRAPPER</h3>
            <div className="font-mono text-secondary ed-desc">
              Roboflow retry policy implemented.<br/>
              20 second timeout boundary.<br/>
              Two maximum retries.<br/>
              Only network/server errors retried.
            </div>
          </div>

          <div className="ed-item">
            <h3 className="font-condensed uppercase">03 NO DRIFTING COUNTERS</h3>
            <div className="font-mono text-secondary ed-desc">
              Vote counts are strictly recalculated from the absolute vote table instead of relying on drifting incremental integer updates.
            </div>
          </div>

          <div className="ed-item">
            <h3 className="font-condensed uppercase">04 GRACEFUL DEGRADATION</h3>
            <div className="font-mono text-secondary ed-desc">
              Fallback inference chain.<br/>
              System degrades to keyword heuristics if both local models and external APIs fail.
            </div>
          </div>

          <div className="ed-item">
            <h3 className="font-condensed uppercase">05 CHECKED, NOT ASSUMED</h3>
            <div className="font-mono text-secondary ed-desc">
              AHP consistency verification enforced mathematically before priority matrices are committed.<br/>
              Migration compatibility strictly maintained.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
