import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectStatus.css';

gsap.registerPlugin(ScrollTrigger);

export const ProjectStatus = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1
        }
      });

      tl.fromTo('.ps-field-label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1 })
        .fromTo('.ps-field-value', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.1 }, '<0.2');

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="status" className="viewport-section ps-section" ref={containerRef}>
      <div className="archive-container ps-container">
        
        <div className="ps-header">
          <h2 className="font-display uppercase tight-tracking">
            WHERE THE<br/>SYSTEM STANDS
          </h2>
          <div className="font-serif text-secondary mt-4">Field Report</div>
        </div>

        <div className="ps-content">
          
          <div className="ps-field">
            <div className="ps-field-label font-mono">CITIZEN & ADMIN APP</div>
            <div className="ps-field-value font-condensed uppercase text-accent">Functional</div>
          </div>

          <div className="ps-field">
            <div className="ps-field-label font-mono">BACKEND & APIS</div>
            <div className="ps-field-value font-condensed uppercase text-accent">Functional</div>
          </div>

          <div className="ps-field">
            <div className="ps-field-label font-mono">DATABASE</div>
            <div className="ps-field-value font-condensed uppercase text-accent">Integrated</div>
          </div>

          <div className="ps-field">
            <div className="ps-field-label font-mono">SYSTEM INTEGRATION</div>
            <div className="ps-field-value font-condensed uppercase text-accent">Integrated</div>
          </div>

          <div className="ps-field mt-8">
            <div className="ps-field-label font-mono">WORKING DEMO CAPABILITIES</div>
            <ul className="ps-field-list font-serif text-secondary">
              <li>live submission</li>
              <li>image check</li>
              <li>priority scoring</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
