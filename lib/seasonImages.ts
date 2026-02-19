/**
 * Utility functions for random image selection from /public/images/random/
 * Picks two different images on each page load — one for the hero, one for the approach section.
 */

const RANDOM_IMAGES: string[] = [
  '/images/random/pexels-vasilis-karkalas-155349971-29322363.jpg',
  '/images/random/pexels-truthdevour-2880249.jpg',
  '/images/random/pexels-tomas-malik-793526-24778744.jpg',
  '/images/random/pexels-therato-3855631.jpg',
  '/images/random/pexels-sahn-7667242.jpg',
  '/images/random/pexels-rezwan-1145434.jpg',
  '/images/random/pexels-pixabay-73828.jpg',
  '/images/random/pexels-pixabay-60582.jpg',
  '/images/random/pexels-paulseling-22484104.jpg',
  '/images/random/pexels-paul-harrington-204760746-32724919.jpg',
  '/images/random/pexels-paduret-5052703.jpg',
  '/images/random/pexels-maltelu-1913831.jpg',
  '/images/random/pexels-lolarussian-3679490.jpg',
  '/images/random/pexels-laura-tancredi-7078218.jpg',
  '/images/random/pexels-jplenio-2128161.jpg',
  '/images/random/pexels-jplenio-1123445.jpg',
  '/images/random/pexels-gerhard-lipold-274371-6043062.jpg',
  '/images/random/pexels-eberhardgross-1367192.jpg',
  '/images/random/pexels-darrell-gough-217632-1696474.jpg',
  '/images/random/pexels-andrew-schwark-540305-13337516.jpg',
  '/images/random/pexels-andrea-roman-291935393-15267535.jpg',
  '/images/random/pexels-alohaphotostudio-4628391.jpg',
];

/**
 * Pick two distinct random indices on module load (i.e. each page load / refresh).
 * This guarantees the hero and approach images are always different.
 */
function pickTwoRandom(): [string, string] {
  const heroIndex = Math.floor(Math.random() * RANDOM_IMAGES.length);
  let approachIndex = Math.floor(Math.random() * (RANDOM_IMAGES.length - 1));
  if (approachIndex >= heroIndex) approachIndex += 1;
  return [RANDOM_IMAGES[heroIndex], RANDOM_IMAGES[approachIndex]];
}

const [heroImage, approachImage] = pickTwoRandom();

/**
 * Gets a random hero image URL (consistent within a single page load)
 */
export function getHeroImageUrl(): string {
  return heroImage;
}

/**
 * Gets a random approach section image URL (consistent within a single page load, always different from hero)
 */
export function getApproachImageUrl(): string {
  return approachImage;
}
