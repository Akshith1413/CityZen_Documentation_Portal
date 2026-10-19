import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import './AdminWorkflow.css';
import { sceneMotion } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export const AdminWorkflow = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = sceneMotion(containerRef, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: true,
        }
      });

      tl.to('.aw-raw', { opacity: 0, y: -50, duration: 1 })
        .fromTo('.aw-queue', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '<')
        
        .to('.aw-queue', { opacity: 0, y: -50, duration: 1 })
        .fromTo('.aw-map', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '<')
        
        .to('.aw-map', { opacity: 0, y: -50, duration: 1 })
        .fromTo('.aw-workflow', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '<');
        
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="admin" className="viewport-section aw-section" ref={containerRef}>
      <div className="archive-container aw-container">
        
        <div className="aw-header">
          <h2 className="font-display uppercase tight-tracking">
            FROM NOISE<br/>TO A<br/>DECISION QUEUE.
          </h2>
          <div className="aw-stages font-mono">
            <div className="aw-stage">01 INITIAL REVIEW</div>
            <div className="aw-stage">02 ASSESSMENT</div>
            <div className="aw-stage text-accent">03 RESOLUTION</div>
          </div>
        </div>

        <div className="aw-visual">
          <div className="aw-layer aw-raw">
            <div className="aw-layer-title font-condensed text-secondary">RAW COMPLAINTS</div>
            <MediaPlaceholder label="UNSTRUCTURED DATA" metadata="ADMIN-01" className="aw-img" />
          </div>

          <div className="aw-layer aw-queue">
            <div className="aw-layer-title font-condensed text-secondary">PRIORITIZED QUEUE</div>
            <MediaPlaceholder label="ADMIN DASHBOARD" metadata="ADMIN-02" className="aw-img" />
          </div>

          <div className="aw-layer aw-map">
            <div className="aw-layer-title font-condensed text-secondary">SPATIAL HEATMAP</div>
            <MediaPlaceholder label="MAP VIEW" metadata="ADMIN-03" className="aw-img" />
          </div>

          <div className="aw-layer aw-workflow">
            <div className="aw-layer-title font-condensed text-secondary">RESOLUTION WORKFLOW</div>
            <MediaPlaceholder label="COMPLAINT DETAIL" metadata="ADMIN-04" className="aw-img" />
          </div>
        </div>

      </div>
    </section>
  );
};
