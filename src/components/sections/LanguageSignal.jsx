import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LanguageSignal.css';

gsap.registerPlugin(ScrollTrigger);

export const LanguageSignal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: true,
        }
      });

      // Words appear
      tl.fromTo('.ls-phrase', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.5, duration: 1 })
      
      // Highlight emotional keywords
      .to('.ls-keyword', { color: 'var(--accent-primary)', duration: 0.5 })
      
      // Analyze
      .fromTo('.ls-analysis-line', { width: 0 }, { width: '100%', duration: 1 })
      .fromTo('.ls-emotion', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 })
      
      // Show languages
      .fromTo('.ls-lang', { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 })
      
      // Show fallback chain
      .fromTo('.ls-chain', { opacity: 0 }, { opacity: 1, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="languagesignal" className="viewport-section ls-section" ref={containerRef}>
      <div className="archive-container ls-container">
        
        <div className="ls-header">
          <h2 className="font-display uppercase tight-tracking">
            THE REPORT<br/>IS MORE THAN<br/>WORDS.
          </h2>
        </div>

        <div className="ls-visual">
          
          <div className="ls-text-block font-serif">
            <div className="ls-phrase">"The road has completely collapsed."</div>
            <div className="ls-phrase">"It is <span className="ls-keyword">very dangerous</span> for children."</div>
            <div className="ls-phrase">"I have reported this <span className="ls-keyword">three times</span> already."</div>
          </div>

          <div className="ls-analysis-container font-mono">
            <div className="ls-analysis-line"></div>
            <div className="ls-emotions">
              <div className="ls-emotion">URGENCY</div>
              <div className="ls-emotion">CONCERN</div>
              <div className="ls-emotion text-accent">FRUSTRATION</div>
            </div>
          </div>

          <div className="ls-tech-row">
            <div className="ls-languages font-mono text-secondary">
              <div className="ls-lang-title">SARVAM AI VOICE / TEXT</div>
              <div className="ls-lang">English</div>
              <div className="ls-lang">Hindi</div>
              <div className="ls-lang">Tamil</div>
              <div className="ls-lang">Telugu</div>
            </div>

            <div className="ls-chain font-mono">
              <div className="ls-chain-title">FALLBACK CHAIN</div>
              <div>LOCAL MODEL</div>
              <div className="ls-arrow">↓</div>
              <div>HOSTED API</div>
              <div className="ls-arrow">↓</div>
              <div className="text-secondary">KEYWORD HEURISTIC</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
