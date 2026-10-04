import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Finale.css';

gsap.registerPlugin(ScrollTrigger);

export const Finale = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        }
      });

      tl.fromTo('.finale-statement', { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 })
        .to('.finale-statement', { y: -100, opacity: 0.2, duration: 1 })
        .fromTo('.finale-brand', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '<')
        .fromTo('.finale-actions', { opacity: 0 }, { opacity: 1, duration: 1 })
        .fromTo('.finale-meta', { opacity: 0 }, { opacity: 1, duration: 1 })
        
        // Final zoom out
        .to(containerRef.current, { scale: 0.8, opacity: 0, duration: 2 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="finale" className="viewport-section finale-section" ref={containerRef}>
      <div className="archive-container finale-container">
        
        <div className="finale-content">
          <h2 className="finale-statement font-display uppercase tight-tracking">
            A CIVIC COMPLAINT<br/>
            SHOULD NEVER<br/>
            DISAPPEAR<br/>
            IN A QUEUE.
          </h2>

          <div className="finale-brand">
            <h1 className="font-display">CITYZEN</h1>
            <p className="font-serif text-secondary">AI-POWERED CIVIC INTELLIGENCE</p>
          </div>

          <div className="finale-actions font-mono text-accent">
            SEE THE PROBLEM.<br/>
            UNDERSTAND THE EVIDENCE.<br/>
            PRIORITIZE THE RESPONSE.
          </div>

          <div className="finale-meta font-mono text-tertiary">
            23CSE498<br/>TEAM 60
          </div>
        </div>

      </div>
    </section>
  );
};
