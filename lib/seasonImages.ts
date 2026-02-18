/**
 * Utility functions for season-based image selection
 * Uses picsum.photos with specific seeds to get consistent, season-appropriate images
 */

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * Determines the current season based on the date
 */
function getCurrentSeason(): Season {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12

  // Northern hemisphere seasons
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter'; // Dec, Jan, Feb
}

/**
 * Season-specific image seeds for hero section (landscape/nature images)
 * These seeds are chosen to provide consistent, seasonally appropriate images
 */
const HERO_IMAGE_SEEDS: Record<Season, number> = {
  spring: 101, // Fresh, green, blooming
  summer: 202, // Bright, lush, warm
  autumn: 303, // Warm tones, changing leaves
  winter: 404, // Cool, serene, peaceful
};

/**
 * Season-specific image seeds for approach section (portrait/close-up images)
 */
const APPROACH_IMAGE_SEEDS: Record<Season, number> = {
  spring: 501, // Gentle, fresh
  summer: 602, // Vibrant, warm
  autumn: 703, // Rich, earthy
  winter: 804, // Calm, serene
};

/**
 * Gets a season-appropriate hero image URL
 */
export function getHeroImageUrl(): string {
  const season = getCurrentSeason();
  const seed = HERO_IMAGE_SEEDS[season];
  return `https://picsum.photos/1920/1080?seed=${seed}&grayscale&blur=2`;
}

/**
 * Gets a season-appropriate approach section image URL
 */
export function getApproachImageUrl(): string {
  const season = getCurrentSeason();
  const seed = APPROACH_IMAGE_SEEDS[season];
  return `https://picsum.photos/600/800?seed=${seed}`;
}

/**
 * Gets the current season (useful for debugging or other features)
 */
export function getSeason(): Season {
  return getCurrentSeason();
}

