import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CINEMATIC_QUERY } from '../../utils/motion';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Cinematic entrance
      gsap.from('.hero-title-line', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });
      
      gsap.from('.hero-meta', {
        opacity: 0,
        duration: 2,
        delay: 1.5
      });

      // Blob entrance
      gsap.from('.hero-blob-container', {
        scale: 0.5,
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
        delay: 1
      });

      // Parallax scroll effect for blob (compact screens keep the blob in flow)
      const mm = gsap.matchMedia();
      mm.add(CINEMATIC_QUERY, () => {
        gsap.to('.hero-blob-container', {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          y: 150,
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { clientX, clientY } = e;
    // Calculate relative mouse position (-1 to 1)
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    
    // Parallax the border opposite to the image
    gsap.to('.hero-blob-border', {
      x: x * 30, // move up to 30px
      y: y * 30,
      rotationX: -y * 10,
      rotationY: x * 10,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.to('.hero-blob-image', {
      x: -x * 10, // move opposite slightly
      y: -y * 10,
      rotationX: -y * 15,
      rotationY: x * 15,
      duration: 1,
      ease: 'power2.out'
    });
  };

  return (
    <section id="hero" className="viewport-section hero-section" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero-meta font-mono text-secondary">
        <div>CITYZEN</div>
        <div>23CSE498</div>
        <div>PROJECT PHASE 2</div>
        <div>TEAM 60</div>
      </div>

      <div className="archive-container hero-content">
        <h1 className="hero-title font-display uppercase tight-tracking">
          <div className="overflow-hidden"><span className="hero-title-line inline-block">A CITY</span></div>
          <div className="overflow-hidden"><span className="hero-title-line inline-block">SPEAKS IN</span></div>
          <div className="overflow-hidden text-accent"><span className="hero-title-line inline-block">INCIDENTS.</span></div>
        </h1>
        
        <div className="hero-subtitle font-serif">
          CITYZEN &mdash; AI-POWERED CIVIC INTELLIGENCE
        </div>
      </div>

      <div className="hero-blob-container" ref={imageRef}>
        <div className="hero-blob-border"></div>
        <div className="hero-blob-image"></div>
      </div>
    </section>
  );
};
