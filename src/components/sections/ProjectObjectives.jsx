import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectObjectives.css';

gsap.registerPlugin(ScrollTrigger);

const objectivesData = [
  {
    id: '01',
    code: 'OBJ-01',
    badge: 'CITIZEN INTAKE',
    title: 'Provide a Multi-Modal Reporting Interface',
    summary: 'Allow citizens to report civic issues with photographs, location coordinates (with privacy controls), and typed or multilingual voice descriptions.',
    highlights: ['Multi-Modal Capture', 'Location Coordinates + Privacy', 'Voice Speech-to-Text', 'Native Multilingual Input'],
    metric: '3 Ingestion Channels'
  },
  {
    id: '02',
    code: 'OBJ-02',
    badge: 'VISION AI PIPELINE',
    title: 'Automate Evidence Validation',
    summary: 'Integrate Meta’s SAM3 vision pipeline to perform pixel-level segmentation, verify that images match declared categories, and filter irrelevant submissions.',
    highlights: ['Meta SAM3 Integration', 'Pixel-Level Masking', 'Zero-Shot Category Match', 'Automated Spam / Noise Filter'],
    metric: 'Zero Manual Filter Delay'
  },
  {
    id: '03',
    code: 'OBJ-03',
    badge: 'COMPUTER VISION METROLOGY',
    title: 'Estimate Pothole Geometry Asynchronously',
    summary: 'Calculate pothole footprint area, dimensions, and depth from a single photograph using segmented boundaries, device tilt angles, and a pinhole camera model.',
    highlights: ['Single-Photo Photogrammetry', 'Segmented Boundary Extraction', 'IMU Device Tilt Compensation', 'Asynchronous Metrology Worker'],
    metric: 'Area, Length, Width & Depth'
  },
  {
    id: '04',
    code: 'OBJ-04',
    badge: 'SPATIAL DEDUPLICATION',
    title: 'Consolidate Duplicate Reports',
    summary: 'Identify unresolved complaints of the same category within ~40 metres and automatically convert redundant submissions into community upvotes.',
    highlights: ['40-Metre Radius Threshold', 'Category-Aware Spatial Clustering', 'Redundant Ticket Suppression', 'Automatic Community Upvoting'],
    metric: '~40m Spatial Cluster'
  },
  {
    id: '05',
    code: 'OBJ-05',
    badge: 'DECISION THEORY',
    title: 'Compute an Explainable Priority Score',
    summary: 'Formulate an Analytic Hierarchy Process (AHP) scoring model combining visual evidence, critical facility proximity (distance decay), text urgency, and votes on a 0–100 scale.',
    highlights: ['Analytic Hierarchy Process (AHP)', 'Multi-Signal Fusion (43% / 33% / 14% / 10%)', 'Facility Distance Decay', '0–100 Transparent Scale'],
    metric: '5 Calibrated Priority Bands'
  },
  {
    id: '06',
    code: 'OBJ-06',
    badge: 'MUNICIPAL OPERATIONS',
    title: 'Deliver an Administrative Decision-Support System',
    summary: 'Provide municipal authorities with a priority queue, GIS heatmaps, an Explain AI view, and a three-stage resolution workflow (Initial Review → Assessment → Resolution).',
    highlights: ['Ranked Priority Queue', 'Spatial GIS Heatmaps', 'Explain AI Segmentation View', '3-Stage Audited Workflow'],
    metric: 'Review → Assess → Resolve'
  },
  {
    id: '07',
    code: 'OBJ-07',
    badge: 'CIVIC TRANSPARENCY',
    title: 'Ensure Transparency & Lifecycle Tracking',
    summary: 'Enable citizens to track complaint progress, verify resolution status, and participate through community voting.',
    highlights: ['Full Complaint Lifecycle Tracking', 'Public Resolution Verification', 'Community Upvoting Network', 'Audited Municipal Feedback'],
    metric: 'End-to-End Civic Visibility'
  }
];

export const ProjectObjectives = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.po-header',
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

  const activeObj = objectivesData[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : objectivesData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < objectivesData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="objectives" className="viewport-section po-section" ref={containerRef}>
      <div className="archive-container po-container">

        {/* Header */}
        <div className="po-header">
          <div className="po-meta font-mono">
            <span className="text-accent">01 // DELIVERABLES</span>
            <span className="po-pill font-mono">ENGINEERING SCOPE</span>
          </div>
          <h2 className="po-title font-display uppercase tight-tracking">
            PROJECT OBJECTIVES
          </h2>
          <p className="po-subtitle font-serif">
            Seven architectural pillars transforming civic complaint management into an automated, explainable municipal intelligence workflow.
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="po-content-grid">

          {/* Left Column: Quick Interactive Nav */}
          <div className="po-selector-col">
            <div className="po-list-label font-mono text-secondary">SELECT OBJECTIVE [01–07]</div>
            <div className="po-nav-list" role="tablist">
              {objectivesData.map((obj, idx) => (
                <button
                  key={obj.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === idx}
                  className={`po-nav-item ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className="po-item-num font-mono">{obj.id}</span>
                  <div className="po-item-text">
                    <span className="po-item-badge font-mono">{obj.badge}</span>
                    <span className="po-item-title font-condensed">{obj.title}</span>
                  </div>
                  <span className="po-indicator-arrow">→</span>
                </button>
              ))}
            </div>

            {/* Step Controls */}
            <div className="po-controls font-mono">
              <button
                type="button"
                className="po-ctrl-btn"
                onClick={handlePrev}
                aria-label="Previous Objective"
              >
                ← PREV
              </button>
              <span className="po-counter text-accent">
                {String(activeIndex + 1).padStart(2, '0')} / {String(objectivesData.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="po-ctrl-btn"
                onClick={handleNext}
                aria-label="Next Objective"
              >
                NEXT →
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Detail Card */}
          <div className="po-showcase-col">
            <div className="po-card depth-layer-1">

              <div className="po-card-topbar">
                <span className="po-card-code font-mono text-accent">{activeObj.code}</span>
                <span className="po-card-badge font-mono">{activeObj.badge}</span>
                <span className="po-card-metric font-mono text-secondary">{activeObj.metric}</span>
              </div>

              <div className="po-card-body">
                <div className="po-card-watermark font-display" aria-hidden="true">
                  {activeObj.id}
                </div>

                <h3 className="po-card-title font-display">
                  {activeObj.title}
                </h3>

                <p className="po-card-desc font-serif">
                  {activeObj.summary}
                </p>

                <div className="po-card-specs">
                  <div className="po-specs-title font-mono text-secondary">ARCHITECTURAL ATTRIBUTES</div>
                  <div className="po-tags">
                    {activeObj.highlights.map((tag, i) => (
                      <span key={i} className="po-tag font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="po-card-footer font-mono">
                <span>Objectives</span>
                <span className="po-pulse-dot"></span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
