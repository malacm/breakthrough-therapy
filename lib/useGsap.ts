import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface RevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

/**
 * Fade-up (or directional) reveal when element scrolls into view.
 * Fires once and cleans up on unmount.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const {
      y = 40,
      x = 0,
      duration = 0.7,
      delay = 0,
      ease = 'power2.out',
      start = 'top 85%',
    } = options;

    gsap.set(el, { opacity: 0, y, x });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

interface StaggerOptions {
  childSelector: string;
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  /**
   * Skip reveal (leave children visible) when viewport width is below this (px).
   * Use for bottom-of-page content where ScrollTrigger can fail to fire on mobile.
   */
  skipBelowWidth?: number;
}

/**
 * Staggered reveal for a container's children (card grids, lists, etc).
 */
export function useStaggerReveal<T extends HTMLElement>(
  options: StaggerOptions,
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    const {
      childSelector,
      y = 30,
      x = 0,
      duration = 0.6,
      stagger = 0.12,
      ease = 'power2.out',
      start = 'top 85%',
      skipBelowWidth,
    } = options;

    if (
      skipBelowWidth != null &&
      typeof window !== 'undefined' &&
      window.innerWidth < skipBelowWidth
    ) {
      return;
    }

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y, x });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

interface HeroRevealOptions {
  childSelector: string;
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
}

/**
 * Immediate staggered entrance (no scroll trigger) for hero / page-header content.
 */
export function useHeroReveal<T extends HTMLElement>(
  options: HeroRevealOptions,
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    const {
      childSelector,
      y = 30,
      duration = 0.8,
      stagger = 0.15,
      ease = 'power3.out',
      delay = 0.1,
    } = options;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}

/**
 * Infinite horizontal marquee for a strip of cards.
 * Duplicates the inner track so the loop is seamless.
 * Pauses on hover and respects prefers-reduced-motion.
 */
export function useInfiniteCarousel<T extends HTMLElement>(
  speed: number = 40, // px per second
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    if (prefersReducedMotion()) {
      // Just show cards statically
      track.style.overflow = 'auto';
      return;
    }

    // Duplicate children so the loop is seamless
    const original = Array.from(track.children) as HTMLElement[];
    original.forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    const totalWidth = original.reduce(
      (sum, el) => sum + el.offsetWidth + parseInt(getComputedStyle(el).marginRight || '0'),
      0,
    );

    const duration = totalWidth / speed;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => parseFloat(x) % totalWidth),
      },
    });

    const pause = () => tween.pause();
    const resume = () => tween.play();

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);

    return () => {
      tween.kill();
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      // Remove clones
      const clones = Array.from(track.children).slice(original.length);
      clones.forEach((c) => track.removeChild(c));
    };
  }, [speed]);

  return ref;
}

/**
 * Alternating left/right reveal for a list of items.
 * Even-indexed children slide from left, odd from right.
 * Supports optional scale for a more dramatic entrance.
 */
export function useAlternatingReveal<T extends HTMLElement>(
  options: Omit<StaggerOptions, 'x'> & { xOffset?: number; scale?: number },
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    const {
      childSelector,
      y = 20,
      xOffset = 30,
      duration = 0.7,
      scale,
      ease = 'power2.out',
      start = 'top 85%',
    } = options;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const tweens: gsap.core.Tween[] = [];

    children.forEach((child, i) => {
      const fromX = i % 2 === 0 ? -xOffset : xOffset;
      const fromState: gsap.TweenVars = { opacity: 0, y, x: fromX };
      const toState: gsap.TweenVars = { opacity: 1, y: 0, x: 0, duration, ease };

      if (scale !== undefined) {
        fromState.scale = scale;
        toState.scale = 1;
      }

      gsap.set(child, fromState);

      const tween = gsap.to(child, {
        ...toState,
        scrollTrigger: {
          trigger: child,
          start,
          once: true,
        },
      });

      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return ref;
}
