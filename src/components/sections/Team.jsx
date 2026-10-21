import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Team.css';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Keshav S',
    rollNo: 'CB.SC.U4CSE23222',
    initials: 'KS',
    image: '/images/team/team-keshav.jpg'
  },
  {
    name: 'Vimal HariHar SK',
    rollNo: 'CB.SC.U4CSE21002',
    initials: 'VH',
    image: '/images/team/team-vimal.jpg'
  },
  {
    name: 'Arun N',
    rollNo: 'CB.SC.U4CSE21003',
    initials: 'AN',
    image: '/images/team/team-arun.jpg'
  },
  {
    name: 'Kokul M',
    rollNo: 'CB.SC.U4CSE21004',
    initials: 'KM',
    image: '/images/team/team-kokul.jpg'
  },
  {
    name: 'Ravula Akshith',
    rollNo: 'CB.SC.U4CSE23648',
    initials: 'RA',
    image: '/images/team/team-akshith.jpg'
  }
];

export const Team = () => {
  const containerRef = useRef(null);
  // Portraits are added to public/images/team later; fall back to the initials card until then
  const [missingPhotos, setMissingPhotos] = useState({});

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.team-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.team-cards-grid',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="viewport-section team-section" ref={containerRef}>
      <div className="archive-container team-container">

        {/* Section Header */}
        <div className="team-header-block">
          <div className="team-badge font-mono text-accent">TEAM 60</div>
          <h2 className="team-main-title font-display uppercase tight-tracking">
            PROJECT CONTRIBUTORS
          </h2>
        </div>

        {/* 5 Member Cards Grid - All 5 Visible */}
        <div className="team-cards-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card depth-layer-1">

              {/* Photo Area */}
              <div className="team-card-photo-wrapper">
                {member.image && !missingPhotos[member.image] ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-card-img"
                    onError={() => setMissingPhotos((prev) => ({ ...prev, [member.image]: true }))}
                  />
                ) : (
                  <div className="team-card-photo-placeholder font-mono">
                    <div className="team-card-avatar-icon">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                      </svg>
                    </div>
                    <span className="team-card-initials font-display">{member.initials}</span>
                    <span className="team-card-photo-hint">PHOTO HERE</span>
                  </div>
                )}
                <div className="team-card-index font-mono">{String(index + 1).padStart(2, '0')}</div>
              </div>

              {/* Info Area: Below photo Name, Below name Roll Number */}
              <div className="team-card-info">
                <h3 className="team-card-name font-display uppercase tight-tracking">
                  {member.name}
                </h3>
                <div className="team-card-roll font-mono text-secondary">
                  {member.rollNo}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Guide block kept as requested */}
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
