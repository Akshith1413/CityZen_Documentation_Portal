import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Team.css';

gsap.registerPlugin(ScrollTrigger);

export const Team = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const names = gsap.utils.toArray('.team-name');
      
      gsap.fromTo(names, 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: '.team-list',
            start: 'top 70%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="viewport-section team-section" ref={containerRef}>
      <div className="archive-container team-container">
        
        <div className="team-header">
          <div className="font-mono text-secondary mb-4">TEAM 60</div>
          <div className="team-list">
            <h3 className="team-name font-display uppercase tight-tracking">Keshav S</h3>
            <h3 className="team-name font-display uppercase tight-tracking">Vimal HariHar SK</h3>
            <h3 className="team-name font-display uppercase tight-tracking">Arun N</h3>
            <h3 className="team-name font-display uppercase tight-tracking">Kokul M</h3>
            <h3 className="team-name font-display uppercase tight-tracking">Ravula Akshith</h3>
          </div>
        </div>

        <div className="team-guide font-serif text-secondary">
          <div className="font-mono text-tertiary mb-2 uppercase">Guide</div>
          <div className="team-guide-name text-primary">Dr. Prathilothamai M</div>
          <div>Department of Computer Science and Engineering</div>
          <div>Amrita Vishwa Vidyapeetham</div>
        </div>

      </div>
    </section>
  );
};
