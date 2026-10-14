import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectProgress.css';

gsap.registerPlugin(ScrollTrigger);

const completedModules = [
  {
    code: 'MOD-01',
    title: 'Multi-Modal Complaint Intake & Mobile Suite',
    desc: 'Expo/React Native app supporting photo capture, continuous accelerometer tilt sampling, GPS privacy levels (exact to landmark), and multi-lingual input.',
    tag: 'PRODUCTION READY'
  },
  {
    code: 'MOD-02',
    title: 'Meta SAM3 Vision Validation & Explain AI',
    desc: 'Roboflow-hosted SAM3 workflow with pixel-level segmentation, zero-shot class validation against declared categories, confidence gates, and visual mask inspection.',
    tag: 'INTEGRATED'
  },
  {
    code: 'MOD-03',
    title: 'AHP Multi-Signal Priority Engine',
    desc: 'Analytic Hierarchy Process model combining visual evidence (43%), facility proximity (33%), text urgency (14%), and votes (10%) with verified Consistency Ratio (CR ≤ 0.10).',
    tag: 'CALIBRATED'
  },
  {
    code: 'MOD-04',
    title: 'Location Intelligence & Google Places Density',
    desc: 'Facility density probe (dense urban to rural) driving adaptive search radii (800m–10km) and negative-exponential distance decay for critical infrastructure.',
    tag: 'OPERATIONAL'
  },
  {
    code: 'MOD-05',
    title: 'Deduplication & Community Upvoting Engine',
    desc: 'Spatial clustering within ~40 metres that converts duplicate submissions into live upvotes, backed by device-level uniqueness constraints and absolute table recomputation.',
    tag: 'DEPLOYED'
  },
  {
    code: 'MOD-06',
    title: 'Admin Triage Console & 3-Stage Workflow',
    desc: 'Web & mobile dashboard featuring priority queues, GIS marker & heatmap clustering, and audited three-tier transitions: Initial Review → Assessment → Resolution.',
    tag: 'FUNCTIONAL'
  }
];

const futureWorkModules = [
  {
    code: 'TBD-01',
    title: 'Formal Database Migration Tooling',
    desc: 'Transition from Supabase dashboard SQL scripts to automated Prisma/Flyway migration pipelines with rollback guarantees.',
    status: 'PHASE 2'
  },
  {
    code: 'TBD-02',
    title: 'Historical Regression-Fitted Priority Weights',
    desc: 'Refit and fine-tune AHP weights through empirical regression once longitudinal municipal resolution-outcome dataset matures.',
    status: 'RESEARCH'
  },
  {
    code: 'TBD-03',
    title: 'Dynamic Slant Metrology Field Calibration',
    desc: 'Field verification of the single-image pinhole camera model across varied real-world road surfaces and extreme camera pitch angles.',
    status: 'FIELD TRIAL'
  },
  {
    code: 'TBD-04',
    title: 'Contractor Dispatch Mobile Telemetry',
    desc: 'Dedicated field-contractor status update module with automated GPS geofence resolution confirmation and material consumption logging.',
    status: 'PLANNED'
  }
];

export const ProjectProgress = () => {
  const containerRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Counter animation for main percentage
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 85,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = `${Math.round(counter.val)}%`;
          }
        }
      });

      // Stagger in completed cards
      gsap.fromTo('.prog-card-done',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          scrollTrigger: {
            trigger: '.prog-grid-done',
            start: 'top 85%',
          }
        }
      );

      // Stagger in future work cards
      gsap.fromTo('.prog-card-future',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          scrollTrigger: {
            trigger: '.prog-grid-future',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="progress" className="viewport-section prog-section" ref={containerRef}>
      <div className="archive-container prog-container">

        {/* Header */}
        <div className="prog-header">
          <div className="prog-meta font-mono">
            <span className="text-accent">09 // STATUS</span>
            <span className="prog-pill font-mono">PHASE 2 STATUS</span>
          </div>
          <h2 className="prog-main-title font-display uppercase tight-tracking">
            PROJECT PROGRESS
          </h2>
          <p className="prog-subtitle font-serif">
            Current system execution status, completed functional milestones, and scheduled roadmap deliverables for Cityzen Phase 2.
          </p>
        </div>

        {/* Hero KPI Gauge & Status Bar */}
        <div className="prog-kpi-card depth-layer-1">
          <div className="prog-kpi-left">
            <div className="prog-kpi-metric font-display">
              <span ref={percentRef} className="prog-percent-num">85%</span>
              <span className="prog-percent-label font-mono text-accent">COMPLETE</span>
            </div>
            <div className="prog-kpi-caption font-serif text-secondary">
              Overall System Architecture & Core Pipeline Milestone Completion
            </div>
          </div>

          <div className="prog-kpi-right font-mono">
            <div className="prog-bar-wrapper">
              <div className="prog-bar-track">
                <div className="prog-bar-fill" style={{ width: '85%' }}></div>
              </div>
              <div className="prog-bar-legend">
                <span>0% INTAKE</span>
                <span>CORE ENGINES: VERIFIED</span>
                <span>100% TARGET</span>
              </div>
            </div>

            <div className="prog-stats-grid">
              <div className="prog-stat-item">
                <span className="prog-stat-val text-accent">6/6</span>
                <span className="prog-stat-lbl">CORE ENGINES</span>
              </div>
              <div className="prog-stat-item">
                <span className="prog-stat-val">CR ≤ 0.10</span>
                <span className="prog-stat-lbl">AHP CONSISTENCY</span>
              </div>
              <div className="prog-stat-item">
                <span className="prog-stat-val">~40m</span>
                <span className="prog-stat-lbl">DEDUP RADIUS</span>
              </div>
              <div className="prog-stat-item">
                <span className="prog-stat-val">3-STAGE</span>
                <span className="prog-stat-lbl">AUDITED WORKFLOW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Showcase: Completed Milestones vs Future Works */}
        <div className="prog-columns">

          {/* Completed Modules */}
          <div className="prog-col">
            <div className="prog-col-header font-mono">
              <span className="prog-status-dot done"></span>
              <span className="prog-col-title font-condensed">COMPLETED MILESTONES & CORE SYSTEMS</span>
              <span className="prog-col-count text-accent">06 COMPLETED</span>
            </div>

            <div className="prog-grid prog-grid-done">
              {completedModules.map((item, idx) => (
                <div key={idx} className="prog-card prog-card-done">
                  <div className="prog-card-topbar font-mono">
                    <span className="prog-card-code text-accent">{item.code}</span>
                    <span className="prog-card-badge done">{item.tag}</span>
                  </div>
                  <h4 className="prog-card-heading font-display">{item.title}</h4>
                  <p className="prog-card-desc font-serif">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Future Work & Roadmap */}
          <div className="prog-col">
            <div className="prog-col-header font-mono">
              <span className="prog-status-dot future"></span>
              <span className="prog-col-title font-condensed">FUTURE ROADMAP & FIELD TESTING</span>
              <span className="prog-col-count text-secondary">04 SCHEDULED</span>
            </div>

            <div className="prog-grid prog-grid-future">
              {futureWorkModules.map((item, idx) => (
                <div key={idx} className="prog-card prog-card-future">
                  <div className="prog-card-topbar font-mono">
                    <span className="prog-card-code text-secondary">{item.code}</span>
                    <span className="prog-card-badge future">{item.status}</span>
                  </div>
                  <h4 className="prog-card-heading font-display">{item.title}</h4>
                  <p className="prog-card-desc font-serif">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
