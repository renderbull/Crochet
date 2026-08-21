export interface ColorTheme {
  accent: string;
  accentHover: string;
  lightBg: string;
  border: string;
  glow: string;
}

// Default fallback theme (soft pink / dusty rose)
export const DEFAULT_THEME: ColorTheme = {
  accent: 'var(--accent-color)',
  accentHover: 'var(--accent-hover)',
  lightBg: 'var(--pastel-pink-light)',
  border: 'rgba(114, 98, 88, 0.1)',
  glow: 'rgba(228, 147, 144, 0.15)'
};

// Curated harmonious themes for each product category
export const CATEGORY_THEMES: Record<string, ColorTheme> = {
  'rakhi': {
    accent: 'hsl(14, 75%, 45%)',      // Warm terracotta / deep orange
    accentHover: 'hsl(14, 75%, 38%)',
    lightBg: 'hsl(14, 75%, 96%)',
    border: 'hsl(14, 50%, 88%)',
    glow: 'hsla(14, 75%, 45%, 0.15)'
  },
  'couple-rakhi': {
    accent: 'hsl(343, 65%, 48%)',  // Soft raspberry / deep rose
    accentHover: 'hsl(343, 65%, 41%)',
    lightBg: 'hsl(343, 65%, 97%)',
    border: 'hsl(343, 40%, 90%)',
    glow: 'hsla(343, 65%, 48%, 0.15)'
  },
  'earrings': {
    accent: 'hsl(215, 60%, 48%)',    // Classic pastel denim / slate blue
    accentHover: 'hsl(215, 60%, 41%)',
    lightBg: 'hsl(215, 60%, 96%)',
    border: 'hsl(215, 40%, 89%)',
    glow: 'hsla(215, 60%, 48%, 0.15)'
  },
  'accessories': {
    accent: 'hsl(28, 50%, 45%)',     // Bronze / warm caramel
    accentHover: 'hsl(28, 50%, 38%)',
    lightBg: 'hsl(28, 50%, 96%)',
    border: 'hsl(28, 30%, 88%)',
    glow: 'hsla(28, 50%, 45%, 0.15)'
  },
  'hair-accessories': {
    accent: 'hsl(158, 45%, 40%)',  // Pastel emerald / sage green
    accentHover: 'hsl(158, 45%, 33%)',
    lightBg: 'hsl(158, 45%, 96%)',
    border: 'hsl(158, 30%, 88%)',
    glow: 'hsla(158, 45%, 40%, 0.15)'
  },
  'keychains': {
    accent: 'hsl(280, 50%, 48%)',    // Soft lavender / amethyst
    accentHover: 'hsl(280, 50%, 41%)',
    lightBg: 'hsl(280, 50%, 97%)',
    border: 'hsl(280, 35%, 90%)',
    glow: 'hsla(280, 50%, 48%, 0.15)'
  }
};

/**
 * Returns a static, pre-curated color theme based on the product category.
 */
export function getCategoryTheme(category: string): ColorTheme {
  const cat = (category || '').toLowerCase().trim();
  if (CATEGORY_THEMES[cat]) {
    return CATEGORY_THEMES[cat];
  }
  // Fallback matching logic
  for (const key of Object.keys(CATEGORY_THEMES)) {
    if (cat.includes(key) || key.includes(cat)) {
      return CATEGORY_THEMES[key];
    }
  }
  return DEFAULT_THEME;
}

/**
 * Converts RGB color values to HSL.
 */
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// In-memory cache to avoid re-extracting for the same image
const themeCache: Record<string, ColorTheme> = {};

/**
 * Extracts a dynamic, visually pleasing color theme from an image URL.
 */
export function extractThemeFromImage(imageUrl: string): Promise<ColorTheme> {
  if (typeof window === 'undefined') {
    return Promise.resolve(DEFAULT_THEME);
  }

  if (themeCache[imageUrl]) {
    return Promise.resolve(themeCache[imageUrl]);
  }

  return new Promise((resolve) => {
    const img = new Image();
    // Only set crossOrigin if the image is remote, to prevent local relative path CORS block
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      img.crossOrigin = 'Anonymous';
    }
    img.src = imageUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(DEFAULT_THEME);
          return;
        }

        // Draw image onto a 16x16 canvas to downsample and get dominant/average color
        canvas.width = 16;
        canvas.height = 16;
        ctx.drawImage(img, 0, 0, 16, 16);

        const imgData = ctx.getImageData(0, 0, 16, 16).data;
        let rSum = 0, gSum = 0, bSum = 0, count = 0;

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          // Ignore transparent and overly neutral/gray/white background pixels if possible
          if (a < 200) continue;
          
          // Let's also check if it's too white (background) or pure black
          const brightness = (r + g + b) / 3;
          if (brightness > 245 || brightness < 15) continue;

          rSum += r;
          gSum += g;
          bSum += b;
          count++;
        }

        // If all pixels filtered out, reuse average of all pixels without filters
        if (count === 0) {
          for (let i = 0; i < imgData.length; i += 4) {
            rSum += imgData[i];
            gSum += imgData[i + 2]; // B
            bSum += imgData[i + 1]; // G
            count++;
          }
        }

        const avgR = Math.round(rSum / count);
        const avgG = Math.round(gSum / count);
        const avgB = Math.round(bSum / count);

        const { h, s } = rgbToHsl(avgR, avgG, avgB);

        // Adjust HSL variables to produce cohesive and accessible UI colors
        // Keep saturation decent and lightness in a range that is legible/beautiful
        const finalS = Math.max(s, 40); // ensure it is vibrant
        const finalL = 45; // standard readable level for accent text/buttons
        const finalLHover = 38; // darker variant for button hover
        const finalLLight = 96; // extremely soft pastel background
        const finalLBorder = 88; // subtle borders

        const theme: ColorTheme = {
          accent: `hsl(${h}, ${finalS}%, ${finalL}%)`,
          accentHover: `hsl(${h}, ${finalS}%, ${finalLHover}%)`,
          lightBg: `hsl(${h}, ${finalS}%, ${finalLLight}%)`,
          border: `hsl(${h}, ${Math.max(finalS - 10, 20)}%, ${finalLBorder}%)`,
          glow: `hsla(${h}, ${finalS}%, ${finalL}%, 0.15)`
        };

        themeCache[imageUrl] = theme;
        resolve(theme);
      } catch (e) {
        console.error('Error generating dynamic theme from image:', e);
        resolve(DEFAULT_THEME);
      }
    };

    img.onerror = () => {
      resolve(DEFAULT_THEME);
    };
  });
}
