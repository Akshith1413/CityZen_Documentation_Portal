import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProblemStatement.css';

gsap.registerPlugin(ScrollTrigger);

const defectsList = [
  'POTHOLES',
  'FALLEN TREES',
  'GARBAGE DUMPING',
  'STRAY CATTLE',
  'FALLEN ELECTRIC POLES',
  'DAMAGED CONCRETE STRUCTURES',
  'ROAD WATERLOGGING'
];

const bottlenecks = [
  {
    id: '01',
    code: 'BOTTLENECK-01',
    label: 'VERIFICATION',
    title: 'Manual Evidence Verification',
    description: 'Staff must manually inspect submitted photos and descriptions, resulting in backlogs and an inability to reliably filter irrelevant or fake reports.',
    impact: 'Backlogs & Noise Ingestion',
    consequence: 'Staff overload and delayed triage for genuine hazards'
  },
  {
    id: '02',
    code: 'BOTTLENECK-02',
    label: 'PRIORITIZATION',
    title: 'Subjective, Non-Contextual Prioritization',
    description: 'Complaints lack multi-signal risk assessment; life-threatening hazards compete equally with low-priority maintenance issues.',
    impact: 'Zero Risk Assessment',
    consequence: 'Critical road hazards treated identically to minor aesthetics'
  },
  {
    id: '03',
    code: 'BOTTLENECK-03',
    label: 'FRAGMENTATION',
    title: 'Ticket Fragmentation',
    description: 'Multiple citizens report the same unresolved defect, generating duplicate tickets, redundant inspections, and fragmented records instead of consolidated community feedback.',
    impact: 'Redundant Dispatches',
    consequence: 'Disconnected inspection teams dispatched to identical coordinates'
  },
  {
    id: '04',
    code: 'BOTTLENECK-04',
    label: 'SPATIAL CONTEXT',
    title: 'Lack of Spatial & Quantitative Context',
    description: 'Reports ignore proximity to critical infrastructure (schools, hospitals) and lack quantitative defect measurements (pothole area/depth) needed for repair planning.',
    impact: 'Zero Dimensional Insight',
    consequence: 'Repair crews arrive without material volume or spatial urgency data'
  },
  {
    id: '05',
    code: 'BOTTLENECK-05',
    label: 'DECISION OPACITY',
    title: 'Opaque Decision-Making',
    description: 'Municipal teams lack an explainable interface showing why specific issues are prioritized over others.',
    impact: 'Black-Box Governance',
    consequence: 'Unverifiable prioritization leaves public trust fractured'
  }
];

export const ProblemStatement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.prob-header', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const currentBottleneck = bottlenecks[activeTab];

  const handlePrev = () => {
    setActiveTab((prev) => (prev > 0 ? prev - 1 : bottlenecks.length - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev < bottlenecks.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="problem" className="viewport-section prob-section" ref={containerRef}>
      <div className="archive-container prob-container">
        
        {/* Header */}
        <div className="prob-header">
          <div className="prob-meta font-mono">
            <span className="text-accent">02 // SYSTEM CHALLENGES</span>
            <span className="prob-pill font-mono">MUNICIPAL BOTTLENECK AUDIT</span>
          </div>
          <h2 className="prob-main-title font-display uppercase tight-tracking">
            PROBLEM STATEMENT
          </h2>
          <p className="prob-intro-text font-serif">
            Urban civic infrastructure defects—such as potholes, fallen trees, garbage dumping, stray cattle, fallen electric poles, damaged concrete structures, and road waterlogging—severely impact public safety, mobility, and urban quality of life. However, existing municipal complaint-management mechanisms suffer from several critical operational bottlenecks:
          </p>

          {/* Defect Chips Marquee / Tags */}
          <div className="prob-defects-bar font-mono">
            <span className="prob-defects-label text-secondary">INFRASTRUCTURE DEFECTS:</span>
            <div className="prob-defects-chips">
              {defectsList.map((defect, i) => (
                <span key={i} className="prob-defect-chip">
                  {defect}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Bottleneck Explorer */}
        <div className="prob-bottlenecks-wrapper">
          
          {/* Tab Selector Buttons */}
          <div className="prob-tabs-list" role="tablist">
            {bottlenecks.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeTab === idx}
                className={`prob-tab-btn ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className="prob-tab-num font-mono">{item.id}</span>
                <span className="prob-tab-label font-condensed">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Active Bottleneck Presentation Card */}
          <div className="prob-active-card depth-layer-1">
            <div className="prob-card-header">
              <div className="prob-card-tag font-mono text-accent">{currentBottleneck.code}</div>
              <div className="prob-card-impact font-mono">
                <span className="text-secondary">SYSTEM DEFICIENCY:</span> {currentBottleneck.impact}
              </div>
              <div className="prob-card-nav font-mono">
                <button type="button" onClick={handlePrev} className="prob-nav-arrow" aria-label="Previous bottleneck">←</button>
                <span>{String(activeTab + 1).padStart(2, '0')} / {String(bottlenecks.length).padStart(2, '0')}</span>
                <button type="button" onClick={handleNext} className="prob-nav-arrow" aria-label="Next bottleneck">→</button>
              </div>
            </div>

            <div className="prob-card-main">
              <h3 className="prob-card-headline font-display">
                {currentBottleneck.title}
              </h3>
              <p className="prob-card-desc font-serif">
                {currentBottleneck.description}
              </p>

              <div className="prob-card-callout font-mono">
                <span className="text-accent">OPERATIONAL CONSEQUENCE:</span>
                <span className="prob-consequence-text">{currentBottleneck.consequence}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Cityzen Resolution Banner */}
        <div className="prob-resolution-banner">
          <div className="prob-res-badge font-mono text-accent">THE CITYZEN RESOLUTION</div>
          <p className="prob-res-text font-serif">
            Cityzen resolves these challenges by integrating AI-based evidence validation, automated duplicate consolidation, single-image metrology, and explainable multi-signal priority scoring into a unified civic platform.
          </p>
          <div className="prob-res-tags font-mono">
            <span>SAM3 Validation</span>
            <span>•</span>
            <span>Duplicate Consolidation (~40m)</span>
            <span>•</span>
            <span>Pinhole Metrology</span>
            <span>•</span>
            <span>Explainable AHP Scoring</span>
          </div>
        </div>

      </div>
    </section>
  );
};
