import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Documentation.css';

gsap.registerPlugin(ScrollTrigger);

export const Documentation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.doc-link', 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.doc-list',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const docItems = [
    "PROJECT STATEMENT",
    "OBJECTIVES",
    "METHODOLOGY",
    "SYSTEM ARCHITECTURE",
    "AI PIPELINE",
    "PRIORITY ENGINE",
    "DATABASE",
    "ENGINEERING DECISIONS",
    "CURRENT PROGRESS"
  ];

  return (
    <section id="documentation" className="viewport-section doc-section" ref={containerRef}>
      <div className="archive-container doc-container">
        
        <div className="doc-content">
          <h2 className="font-display uppercase tight-tracking doc-headline">
            PROJECT<br/>DOCUMENTATION
          </h2>

          <div className="doc-list font-mono">
            {docItems.map((item, idx) => (
              <div key={idx} className="doc-item">
                <span className="text-secondary">{String(idx + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="doc-actions">
          <a href="[PLACEHOLDER_SRS_URL]" target="_blank" rel="noreferrer" className="doc-btn font-condensed">
            VIEW SRS
          </a>
          <a href="[PLACEHOLDER_GITHUB_URL]" target="_blank" rel="noreferrer" className="doc-btn font-condensed">
            GITHUB REPOSITORY
          </a>
          <a href="#video" className="doc-btn font-condensed">
            PROJECT DEMONSTRATION
          </a>
        </div>

      </div>
    </section>
  );
};
