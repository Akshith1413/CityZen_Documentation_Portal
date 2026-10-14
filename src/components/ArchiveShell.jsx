import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './sections/Hero';
import { ProjectObjectives } from './sections/ProjectObjectives';
import { ProblemStatement } from './sections/ProblemStatement';
import { ProjectMethodology } from './sections/ProjectMethodology';
import { Observation } from './sections/Observation';
import { ImageValidation } from './sections/ImageValidation';
import { GeometryExperience } from './sections/GeometryExperience';
import { ModelComparison } from './sections/ModelComparison';
import { PriorityEngine } from './sections/PriorityEngine';
import { LocationIntelligence } from './sections/LocationIntelligence';
import { LanguageSignal } from './sections/LanguageSignal';
import { DuplicateConvergence } from './sections/DuplicateConvergence';
import { AdminWorkflow } from './sections/AdminWorkflow';
import { ArchitectureExperience } from './sections/ArchitectureExperience';
import { EngineeringDecisions } from './sections/EngineeringDecisions';
import { ProjectStatus } from './sections/ProjectStatus';
import { Team } from './sections/Team';
import { Documentation } from './sections/Documentation';
import { MediaArchive } from './sections/MediaArchive';
import { VideoSection } from './sections/VideoSection';
import { Finale } from './sections/Finale';

gsap.registerPlugin(ScrollTrigger);

export const ArchiveShell = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="archive-shell">
      <main>
        <Hero />
        <ProjectObjectives />
        <ProblemStatement />
        <ProjectMethodology />
        <Observation />
        <ImageValidation />
        <GeometryExperience />
        <ModelComparison />
        <PriorityEngine />
        <LocationIntelligence />
        <LanguageSignal />
        <DuplicateConvergence />
        <AdminWorkflow />
        <ArchitectureExperience />
        <EngineeringDecisions />
        <ProjectStatus />
        <Team />
        <Documentation />
        <MediaArchive />
        <VideoSection />
        <Finale />
      </main>
    </div>
  );
};
