import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DuplicateConvergence.css';

gsap.registerPlugin(ScrollTrigger);

export const DuplicateConvergence = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
        }
      });

      // Reports descend
      tl.fromTo('.dc-report', 
        { y: -300, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
      )
      
      // Convergence (slide together)
      .to('.dc-report', {
        x: 0, 
        y: 0,
        rotation: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        duration: 1.5,
        ease: 'power2.inOut'
      })

      // Compress and merge
      .to('.dc-report:not(.dc-master)', {
        scale: 0,
        opacity: 0,
        duration: 0.5
      })

      .to('.dc-master', {
        scale: 1.2,
        borderColor: 'var(--accent-primary)',
        boxShadow: '0 20px 40px rgba(142,18,58,0.1)',
        duration: 0.5
      })

      // Update vote counter
      .fromTo('.dc-vote-update', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 })
      .to('.dc-votes', { innerText: 10, snap: { innerText: 1 }, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="duplicate" className="viewport-section dc-section" ref={containerRef}>
      <div className="archive-container dc-container">
        
        <div className="dc-header">
          <h2 className="font-display uppercase tight-tracking text-center">
            TEN REPORTS.<br/>ONE PROBLEM.
          </h2>
          <p className="font-serif text-center text-secondary">
            System identifies an existing unresolved complaint within ~40 metres.
          </p>
        </div>

        <div className="dc-visual">
          <div className="dc-reports">
            {/* Generate 9 background reports and 1 master */}
            {[...Array(9)].map((_, i) => (
              <div key={i} className="dc-report font-mono" style={{
                left: `${10 + (i * 10)}%`,
                top: `${(i % 3) * 20}px`,
                rotation: `${(i - 4) * 5}deg`
              }}>
                CITIZEN_REPORT_{String(i + 1).padStart(3, '0')}
              </div>
            ))}
            
            <div className="dc-report dc-master font-mono">
              <div className="dc-master-header">MASTER INCIDENT</div>
              <div>ID: INC-9942</div>
              <div className="dc-vote-update text-accent mt-2">
                COMMUNITY VOTES: <span className="dc-votes">1</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
