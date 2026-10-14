import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectMethodology.css';

gsap.registerPlugin(ScrollTrigger);

const methodologySteps = [
  {
    step: '01',
    code: 'PIPE-01',
    shortTitle: 'Complaint Collection',
    pill: 'CITIZEN INGESTION',
    title: 'Complaint Collection',
    description: 'The citizen selects an issue category, captures or uploads a photo, provides location details, and optionally submits a typed or spoken description (via multilingual speech-to-text).',
    specs: ['Category Selection', 'Photo Ingestion', 'GPS with Privacy Controls', 'Multilingual Speech-to-Text'],
    flow: { input: 'Citizen Raw Input', process: 'Category & Media Ingestion', output: 'Raw Complaint Payload' }
  },
  {
    step: '02',
    code: 'PIPE-02',
    shortTitle: 'Image Validation (SAM3)',
    pill: 'VISION AI WORKFLOW',
    title: 'Image Validation (SAM3)',
    description: 'The image is uploaded via Cloudinary and analyzed using a Roboflow-hosted SAM3 workflow. The detected category and segmentation mask are evaluated against the citizen’s selection; mismatches are rejected with an actionable reason.',
    specs: ['Cloudinary Upload', 'Roboflow SAM3 Inference', 'Pixel Mask Segmentation', 'Actionable Rejection Feedback'],
    flow: { input: 'Image Asset', process: 'Zero-Shot Mask & Category Verification', output: 'Validated Defect Mask / Rejection' }
  },
  {
    step: '03',
    code: 'PIPE-03',
    shortTitle: 'Text & Emotion Analysis',
    pill: 'NLP INTELLIGENCE',
    title: 'Text Authenticity & Emotion Analysis',
    description: 'The description is validated for spam, relevance, and category consistency. Urgency and negative sentiment (concern, anger, frustration) are scored using a multi-tier fallback model.',
    specs: ['Spam & Relevance Filtering', 'Category Consistency Check', 'Multi-Tier Fallback Model', 'Emotion Urgency Scoring'],
    flow: { input: 'Citizen Description', process: 'Spam, Category & Sentiment Evaluation', output: 'Text Authenticity & Urgency Weight' }
  },
  {
    step: '04',
    code: 'PIPE-04',
    shortTitle: 'Location Intelligence',
    pill: 'SPATIAL CONTEXT',
    title: 'Location Intelligence',
    description: 'Surrounding facility density is probed via the Google Places API. Proximity to critical infrastructure (e.g., hospitals, schools, transit) is scored using negative-exponential distance decay.',
    specs: ['Google Places API Query', 'Critical Facility Density', 'Hospitals, Schools & Transit', 'Negative-Exponential Distance Decay'],
    flow: { input: 'GPS Coordinates', process: 'Surrounding Facility Radii Query', output: 'Proximity Decay Score' }
  },
  {
    step: '05',
    code: 'PIPE-05',
    shortTitle: 'Duplicate Detection',
    pill: 'DEDUPLICATION ENGINE',
    title: 'Duplicate Detection & Vote Consolidation',
    description: 'Before a new record is created, the system checks for unresolved reports of the same category within ~40 metres. If a match exists, the submission is recorded as an upvote on the existing complaint rather than creating a duplicate.',
    specs: ['~40 Metre Radius Threshold', 'Same Category Matching', 'Unresolved Status Check', 'Automatic Upvote Consolidation'],
    flow: { input: 'Coordinates + Category', process: 'Spatial Radius Proximity Lookup', output: 'Upvote Consolidated Ticket' }
  },
  {
    step: '06',
    code: 'PIPE-06',
    shortTitle: 'Priority Scoring (AHP)',
    pill: 'DECISION ALGORITHM',
    title: 'Multi-Signal Priority Scoring (AHP)',
    description: 'The system computes a 0–100 priority score using Analytic Hierarchy Process (AHP) weights: ~43% visual evidence, ~33% facility proximity, ~14% textual urgency, and ~10% community votes, mapped into five priority bands (Critical to Minimal).',
    specs: ['Analytic Hierarchy Process', '43% Visual / 33% Facility Proximity', '14% Text Urgency / 10% Community Votes', '5 Priority Bands (Critical → Minimal)'],
    flow: { input: '4 Multi-Signal Scores', process: 'AHP Matrix Weighted Fusion', output: 'Ranked Priority Score (0–100)' }
  },
  {
    step: '07',
    code: 'PIPE-07',
    shortTitle: 'Pothole Metrology',
    pill: 'ASYNC PHOTOGRAMMETRY',
    title: 'Asynchronous Pothole Metrology',
    description: 'For verified pothole reports, segmentation boundaries and phone tilt angles are processed asynchronously via a pinhole camera model to estimate surface area, length, width, and depth without blocking the submission response.',
    specs: ['Pinhole Camera Model', 'IMU Device Tilt Compensation', 'Segmentation Boundary Bounds', 'Area, Length, Width & Depth'],
    flow: { input: 'Mask + Pitch/Roll Sensor Data', process: 'Async Pinhole Triangulation', output: 'Defect Dimensions & Repair Volume' }
  },
  {
    step: '08',
    code: 'PIPE-08',
    shortTitle: 'Admin Action & Resolution',
    pill: 'MUNICIPAL WORKFLOW',
    title: 'Administrative Action & Resolution',
    description: 'Municipal authorities manage complaints via a web/mobile dashboard featuring priority queues, GIS heatmaps, Explain AI segmentation views, and a three-stage resolution workflow: Initial Review → Assessment → Resolution.',
    specs: ['Web & Mobile Dashboard', 'Dynamic GIS Heatmaps', 'Explain AI Segmentation View', '3-Stage Audited Workflow'],
    flow: { input: 'Prioritized Tickets', process: 'Review → Assessment → Resolution', output: 'Verified Public Resolution' }
  }
];

export const ProjectMethodology = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState('stepper'); // 'stepper' or 'matrix'
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.pm-header', 
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

  const active = methodologySteps[currentStep];

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : methodologySteps.length - 1));
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev < methodologySteps.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="methodology" className="viewport-section pm-section" ref={containerRef}>
      <div className="archive-container pm-container">
        
        {/* Header */}
        <div className="pm-header">
          <div className="pm-header-row">
            <div className="pm-meta font-mono">
              <span className="text-accent">03 // ARCHITECTURAL METHODOLOGY</span>
              <span className="pm-pill font-mono">8 MODULAR PIPELINE STAGES</span>
            </div>
            {/* View Mode Toggle */}
            <div className="pm-mode-toggle font-mono">
              <button 
                type="button" 
                className={`pm-toggle-btn ${viewMode === 'stepper' ? 'active' : ''}`}
                onClick={() => setViewMode('stepper')}
              >
                STEP INSPECTOR
              </button>
              <button 
                type="button" 
                className={`pm-toggle-btn ${viewMode === 'matrix' ? 'active' : ''}`}
                onClick={() => setViewMode('matrix')}
              >
                FULL MATRIX
              </button>
            </div>
          </div>
          
          <h2 className="pm-title font-display uppercase tight-tracking">
            PROJECT METHODOLOGY
          </h2>
          <p className="pm-subtitle font-serif">
            The project follows an AI-assisted civic-intelligence methodology across eight modular steps:
          </p>
        </div>

        {viewMode === 'stepper' ? (
          /* Dynamic Stepper View */
          <div className="pm-stepper-view">
            
            {/* Horizontal Step Track */}
            <div className="pm-track-bar font-mono" role="tablist">
              {methodologySteps.map((item, idx) => (
                <button
                  key={item.step}
                  type="button"
                  role="tab"
                  aria-selected={currentStep === idx}
                  className={`pm-track-node ${currentStep === idx ? 'active' : ''}`}
                  onClick={() => setCurrentStep(idx)}
                >
                  <span className="pm-node-num">{item.step}</span>
                  <span className="pm-node-name">{item.shortTitle}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive Stage Card */}
            <div className="pm-active-stage-card depth-layer-1">
              
              <div className="pm-card-top font-mono">
                <div className="pm-card-stage-badge">
                  <span className="text-accent">STAGE {active.step}</span> / 08
                </div>
                <div className="pm-card-sys-pill">{active.pill}</div>
                <div className="pm-card-nav-controls">
                  <button type="button" onClick={handlePrev} className="pm-nav-btn" aria-label="Previous step">
                    ← PREV
                  </button>
                  <button type="button" onClick={handleNext} className="pm-nav-btn" aria-label="Next step">
                    NEXT →
                  </button>
                </div>
              </div>

              <div className="pm-card-body">
                <div className="pm-step-watermark font-display" aria-hidden="true">
                  {active.step}
                </div>

                <h3 className="pm-step-headline font-display">
                  {active.title}
                </h3>

                <p className="pm-step-desc font-serif">
                  {active.description}
                </p>

                {/* Pipeline Dataflow */}
                <div className="pm-flow-diagram font-mono">
                  <div className="pm-flow-node">
                    <span className="pm-flow-label">INPUT</span>
                    <span className="pm-flow-val">{active.flow.input}</span>
                  </div>
                  <div className="pm-flow-connector">→</div>
                  <div className="pm-flow-node highlight">
                    <span className="pm-flow-label">TRANSFORMATION</span>
                    <span className="pm-flow-val">{active.flow.process}</span>
                  </div>
                  <div className="pm-flow-connector">→</div>
                  <div className="pm-flow-node">
                    <span className="pm-flow-label">OUTPUT</span>
                    <span className="pm-flow-val">{active.flow.output}</span>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="pm-step-specs font-mono">
                  <span className="pm-specs-label text-secondary">MODULAR CAPABILITIES:</span>
                  <div className="pm-specs-chips">
                    {active.specs.map((spec, i) => (
                      <span key={i} className="pm-spec-chip">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pm-card-footer font-mono">
                <div className="pm-progress-track">
                  <div 
                    className="pm-progress-fill" 
                    style={{ width: `${((currentStep + 1) / methodologySteps.length) * 100}%` }}
                  ></div>
                </div>
                <div className="pm-footer-status">
                  <span>PIPELINE CONTINUITY: 100% AUDITED</span>
                  <span>STEP {currentStep + 1} OF 8</span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Full Matrix View (8 Compact Grid Cards) */
          <div className="pm-matrix-view">
            {methodologySteps.map((step) => (
              <div key={step.step} className="pm-matrix-card">
                <div className="pm-matrix-top font-mono">
                  <span className="text-accent font-bold">{step.step}</span>
                  <span className="pm-matrix-pill">{step.pill}</span>
                </div>
                <h4 className="pm-matrix-title font-condensed">{step.title}</h4>
                <p className="pm-matrix-desc font-serif">{step.description}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
