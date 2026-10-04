import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import './MediaArchive.css';

gsap.registerPlugin(ScrollTrigger);

export const MediaArchive = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.ma-item');
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { y: 150, opacity: 0.5, scale: 0.95 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 1
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const gallery = [
    { fig: "01", title: "CITIZEN APP", sub: "SUBMISSION FLOW", meta: "APP-01" },
    { fig: "02", title: "ADMIN DASHBOARD", sub: "PRIORITY QUEUE", meta: "ADMIN-01" },
    { fig: "03", title: "COMPLAINT DETAIL", sub: "ASSESSMENT VIEW", meta: "ADMIN-02" },
    { fig: "04", title: "SAM3 SEGMENTATION", sub: "MASK RESULT", meta: "AI-01" },
    { fig: "05", title: "POTHOLE GEOMETRY", sub: "MEASUREMENT RESULT", meta: "AI-02" },
    { fig: "06", title: "PRIORITY ENGINE", sub: "AHP SCORES", meta: "AI-03" },
    { fig: "07", title: "MAP / HEATMAP", sub: "SPATIAL DENSITY", meta: "ADMIN-03" },
    { fig: "08", title: "ARCHITECTURE DIAGRAM", sub: "SYSTEM DESIGN", meta: "SYS-01" },
  ];

  return (
    <section id="media" className="viewport-section ma-section" ref={containerRef}>
      <div className="archive-container ma-container">
        
        <div className="ma-header">
          <h2 className="font-display uppercase tight-tracking">
            MEDIA ARCHIVE
          </h2>
        </div>

        <div className="ma-gallery">
          {gallery.map((g, i) => (
            <div key={i} className={`ma-item ma-pos-${(i % 3) + 1}`}>
              <div className="ma-visual">
                <MediaPlaceholder label={g.title} metadata={g.meta} />
              </div>
              <div className="ma-meta font-mono">
                <span className="text-accent">FIG {g.fig}</span>
                <strong>{g.title}</strong>
                <span className="text-secondary">{g.sub}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
