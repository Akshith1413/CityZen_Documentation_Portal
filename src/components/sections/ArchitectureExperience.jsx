import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ArchitectureExperience.css';

gsap.registerPlugin(ScrollTrigger);

export const ArchitectureExperience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
        }
      });

      // No global stack animation. We animate each layer individually.
      const layers = gsap.utils.toArray('.arch-layer');
      
      layers.forEach((layer, i) => {
        // 1. Peel off from stack and come to center
        // (They are already at z: -200*i, so animating to z: 0 brings them to center)
        tl.to(layer, {
          z: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, i * 1.5); // Stagger each card's entry

        // 2. Fly to top-left and fade out
        tl.to(layer, {
          x: -800,
          y: -800,
          z: 500,
          opacity: 0,
          duration: 1,
          ease: 'power2.in'
        }, (i * 1.5) + 1); // Exit starts after it has been in center
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="architecture" className="viewport-section arch-section" ref={containerRef}>
      <div className="archive-container arch-container">
        
        <div className="arch-header">
          <h2 className="font-display uppercase tight-tracking text-center">
            SYSTEM ARCHITECTURE
          </h2>
          <p className="font-serif text-center text-secondary">A Vertical Technical City</p>
        </div>

        <div className="arch-visual">
          <div className="arch-stack">
            
            <div className="arch-layer arch-layer-1">
              <div className="arch-layer-title font-condensed uppercase">01 Citizen / Admin Experience</div>
              <div className="arch-layer-content font-mono">
                <div>Expo / React Native</div>
                <div>React / Vite</div>
              </div>
            </div>

            <div className="arch-layer arch-layer-2">
              <div className="arch-layer-title font-condensed uppercase">02 Application Layer</div>
              <div className="arch-layer-content font-mono">
                <div>Node.js / Express Middleware</div>
                <div>Auth / Route Protection</div>
              </div>
            </div>

            <div className="arch-layer arch-layer-3">
              <div className="arch-layer-title font-condensed uppercase">03 AI / Data Logic</div>
              <div className="arch-layer-content font-mono">
                <div>SAM3 Geometry Extraction</div>
                <div>AHP Priority Scoring</div>
                <div>Location Intelligence</div>
              </div>
            </div>

            <div className="arch-layer arch-layer-4">
              <div className="arch-layer-title font-condensed uppercase">04 Business Logic</div>
              <div className="arch-layer-content font-mono">
                <div>Duplicate Resolution</div>
                <div>Workflow State Management</div>
              </div>
            </div>

            <div className="arch-layer arch-layer-5">
              <div className="arch-layer-title font-condensed uppercase">05 Database / Services</div>
              <div className="arch-layer-content font-mono">
                <div>Supabase / Postgres DB</div>
                <div>Roboflow / Cloudinary / Sarvam AI</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
