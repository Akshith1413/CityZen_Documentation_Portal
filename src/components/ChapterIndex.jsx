import React, { useEffect, useState } from 'react';
import './ChapterIndex.css';

const chapters = [
  { id: 'hero', label: '00 INTRO' },
  { id: 'problem', label: '01 THE PROBLEM' },
  { id: 'observation', label: '02 OBSERVE' },
  { id: 'validation', label: '03 VERIFY' },
  { id: 'geometry', label: '04 MEASURE' },
  { id: 'models', label: '05 MODELS' },
  { id: 'priority', label: '06 SCORE' },
  { id: 'location', label: '07 LOCATE' },
  { id: 'language', label: '08 LANGUAGE' },
  { id: 'duplicate', label: '09 UNIFY' },
  { id: 'admin', label: '10 ADMIN' },
  { id: 'architecture', label: '11 ARCHITECTURE' },
  { id: 'engineering', label: '12 ENGINEER' },
  { id: 'status', label: '13 STATUS' },
  { id: 'team', label: '14 TEAM' }
];

export const ChapterIndex = () => {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = chapters.map(c => document.getElementById(c.id));
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
      let currentId = 'hero';
      sections.forEach(sec => {
        if (sec && sec.offsetTop <= scrollPos) {
          currentId = sec.id;
        }
      });
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="chapter-index">
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id} className={activeId === chapter.id ? 'active' : ''}>
            <a href={`#${chapter.id}`}>
              <span className="chapter-line"></span>
              <span className="chapter-label font-mono">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
