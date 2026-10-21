import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Keep these in sync with the "compact layout" media query used across the CSS:
//   @media (max-width: 768px), (max-height: 520px), (max-width: 1024px) and (orientation: portrait)
// Compact screens (phones, tablets in portrait, phones in landscape) get a
// stacked, static layout. Everything else gets the pinned, scrubbed scenes.
export const COMPACT_QUERY = '(max-width: 768px), (max-height: 520px), (max-width: 1024px) and (orientation: portrait)';
export const CINEMATIC_QUERY = '(min-width: 769px) and (min-height: 521px) and (orientation: landscape), (min-width: 1025px) and (min-height: 521px)';

// Pixel offsets in the cinematic timelines were authored for a 1440x900 canvas.
// Scale them down on smaller viewports so they never push content off-screen.
// Pair with `invalidateOnRefresh: true` so the value is re-read on resize.
export const fluid = (px, minRatio = 0.4) => () => {
  const ratio = Math.min(window.innerWidth / 1440, window.innerHeight / 900);
  return Math.round(px * Math.min(1, Math.max(minRatio, ratio)));
};

// Gentle fade-up for each top-level block of a section on compact screens.
const revealBlocks = (root) => {
  root.querySelectorAll(':scope > .archive-container > *').forEach((block) => {
    gsap.from(block, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: block, start: 'top 90%', once: true },
    });
  });
};

// Reverting a gsap.matchMedia() context can leave the tweens' start values behind
// as inline styles (e.g. `opacity: 0`, `height: 0%`). Those would then override the
// stylesheet in the other layout, so remember the inline styles the section started
// with (React-owned ones included) and put them back whenever a layout is torn down.
const snapshotInlineStyles = (root) => {
  const saved = new Map();
  root.querySelectorAll('*').forEach((el) => saved.set(el, el.getAttribute('style')));

  return () => {
    saved.forEach((style, el) => {
      if (style === null) el.removeAttribute('style');
      else el.setAttribute('style', style);
    });
  };
};

/**
 * Runs `cinematic` (the pinned/scrubbed timeline) only on roomy viewports and
 * re-evaluates when the viewport crosses the breakpoint (rotation, resize).
 * On compact screens the section stays static and `compact` (optional) runs
 * after the default reveal.
 *
 * Returns a gsap.MatchMedia, which has the same `.revert()` as a gsap.Context.
 */
export const sceneMotion = (scope, cinematic, compact) => {
  const root = scope.current ?? scope;
  const restoreInlineStyles = snapshotInlineStyles(root);
  const mm = gsap.matchMedia(scope);

  mm.add(CINEMATIC_QUERY, () => {
    cinematic();
    return restoreInlineStyles;
  });

  mm.add(COMPACT_QUERY, () => {
    revealBlocks(root);
    if (compact) compact(root);
    return restoreInlineStyles;
  });

  return mm;
};
