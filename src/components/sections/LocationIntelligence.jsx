import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LocationIntelligence.css';

gsap.registerPlugin(ScrollTrigger);

export const LocationIntelligence = () => {
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

      // Expand radii
      tl.fromTo('.li-radius-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.1, duration: 1 })
        .fromTo('.li-radius-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.05, duration: 1 }, '<0.2')
        .fromTo('.li-radius-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.02, duration: 1 }, '<0.2')
        
        // Reveal text points
        .fromTo('.li-point-urban', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1)
        .fromTo('.li-point-rural', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5)
        .fromTo('.li-decay-curve', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1 }, 2);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="location" className="viewport-section li-section" ref={containerRef}>
      <div className="archive-container li-container">
        
        <div className="li-header">
          <h2 className="font-display uppercase tight-tracking">
            URGENCY<br/>HAS A<br/>GEOGRAPHY.
          </h2>
          <div className="li-features font-mono text-secondary">
            <div className="li-feature">facility proximity</div>
            <div className="li-feature">distance decay</div>
            <div className="li-feature">density-aware search radius</div>
            <div className="li-feature">category-relevant facilities</div>
            <div className="li-feature">privacy-aware location handling</div>
          </div>
        </div>

        <div className="li-visual">
          
          <div className="li-map-abstract">
            <div className="li-incident-center"></div>
            <div className="li-radius li-radius-1"></div>
            <div className="li-radius li-radius-2"></div>
            <div className="li-radius li-radius-3"></div>

            <div className="li-point li-point-urban font-mono">
              <strong>800 m</strong><br/>
              <span>dense urban</span>
            </div>

            <div className="li-point li-point-rural font-mono">
              <strong>up to 10 km</strong><br/>
              <span>rural</span>
            </div>
          </div>

          <div className="li-decay-graph">
            <div className="font-mono text-secondary text-xs mb-2 uppercase">Negative Exponential Decay</div>
            <div className="li-decay-axis">
              <div className="li-decay-curve"></div>
            </div>
            <div className="li-decay-labels font-mono">
              <span>0km</span>
              <span>Distance</span>
              <span>10km</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
