---
name: Clinical Performance
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3d4a3e'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6c7b6d'
  outline-variant: '#bbcbbb'
  surface-tint: '#006d37'
  primary: '#006d37'
  on-primary: '#ffffff'
  primary-container: '#2ecc71'
  on-primary-container: '#005027'
  inverse-primary: '#4ae183'
  secondary: '#4e6073'
  on-secondary: '#ffffff'
  secondary-container: '#cfe2f9'
  on-secondary-container: '#526478'
  tertiary: '#865300'
  on-tertiary: '#ffffff'
  tertiary-container: '#f8a018'
  on-tertiary-container: '#633c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bfe9c'
  primary-fixed-dim: '#4ae183'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#d1e4fb'
  secondary-fixed-dim: '#b5c8df'
  on-secondary-fixed: '#091d2e'
  on-secondary-fixed-variant: '#36485b'
  tertiary-fixed: '#ffddb9'
  tertiary-fixed-dim: '#ffb961'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#663e00'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is built on a "Modern Clinical Performance" aesthetic. It merges the precision and reliability of the medical sector with the vitality of the sports nutrition industry. The goal is to evoke a sense of scientific rigor while maintaining the approachability of a lifestyle fitness brand.

The style is characterized by:
- **Clean Professionalism:** High use of whitespace to signify transparency and purity of ingredients.
- **Dynamic Stability:** A balance between grounded corporate layouts and energetic color accents.
- **Refined Minimalism:** Reducing visual noise to focus on performance metrics, ingredient data, and clear calls to action.
- **Tactile Trust:** Using soft, layered surfaces that feel premium and accessible, avoiding the aggressive, high-contrast tropes of traditional bodybuilding brands.

## Colors

The palette is designed to balance energy and authority.

- **Primary (Fresh Green):** Used for primary actions, success states, and key brand moments. It represents vitality, natural health, and growth.
- **Secondary (Deep Navy):** Provides the professional "clinical" foundation. Used for headings, navigation, and heavy text to ensure readability and a sense of establishment.
- **Tertiary (Subtle Orange):** Reserved for high-priority alerts, motivation-based micro-interactions, and accentuation of performance stats.
- **Neutral (Clean White/Grey):** The canvas of the application. Light Grey (#F8F9FA) is used for background sections to distinguish them from white card surfaces.

## Typography

This design system utilizes a dual-font approach to differentiate between "Action/Energy" and "Information/Data."

- **Montserrat** is the voice of the brand. It is used for all major headings and calls to action. Its geometric structure provides a bold, confident, and modern look.
- **Inter** is the functional workhorse. It is used for all body copy, descriptions, and UI labels. Its high legibility ensures that complex nutritional information and clinical data remain accessible and easy to digest.
- **Hierarchy:** Use heavy weights for headlines to create a strong visual anchor, while maintaining ample line height in body text to prevent "clinical" data from feeling overwhelming.

## Layout & Spacing

The layout philosophy follows a **Fluid-Responsive Grid** model with a focus on generous internal padding.

- **Desktop:** 12-column grid with a max-width of 1280px. Gutters are fixed at 24px to ensure breathing room between data-heavy elements.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px margins.
- **Spacing Rhythm:** All spacing tokens are multiples of 8px. Use `lg` and `xl` spacing for section breaks to maintain the "clean" aesthetic and avoid a cluttered, discount-store feel.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layers** to create a structured hierarchy.

- **Surface Levels:** The base background is `#F8F9FA`. Interactive components and primary content containers sit on a pure white `#FFFFFF` surface.
- **Shadow Profile:** Shadows are highly diffused and low-opacity. Use a slight Navy tint in the shadow color (`rgba(44, 62, 80, 0.08)`) to maintain color harmony.
- **Interaction Depth:** On hover, cards should slightly lift (increase shadow spread) rather than change color. This maintains the clean, "medical" feel while providing clear feedback.
- **Borders:** Use 1px solid borders in a very light neutral grey (`#E9ECEF`) for secondary elements where shadows would create too much visual weight.

## Shapes

The shape language is consistently **Rounded**, emphasizing health and approachability over the sharp, aggressive angles often found in sports marketing.

- **Global Radius:** Use `0.5rem` (8px) for standard UI elements like buttons and input fields.
- **Card Radius:** Use `1rem` (16px) for content containers and product cards to create a softer, more premium look.
- **Pill Shapes:** Use for chips, tags, and specific "High-Performance" CTA buttons to denote movement and energy.

## Components

### Buttons
- **Primary:** Montserrat Bold, Fresh Green background, white text. Pill-shaped or 8px rounded.
- **Secondary:** Deep Navy border (2px) with Navy text. Clear background.
- **State Changes:** Buttons should use a subtle darken on hover, never a complete color shift.

### Cards
- White background, 16px corner radius, soft ambient shadow.
- Inner padding should be generous (24px or 32px) to keep content centered and legible.

### Inputs & Selection
- **Input Fields:** 8px rounded, light grey border. On focus, the border transitions to Fresh Green with a soft outer glow.
- **Checkboxes/Radios:** Fresh Green when selected. Use slightly larger hit targets (44px min) for ease of use during active gym sessions.

### Chips & Tags
- Used for nutritional callouts (e.g., "High Protein," "Vegan"). 
- Small caps, Inter Bold, 12px. Backgrounds should be low-opacity versions of the primary/tertiary colors with high-contrast text.

### Performance Charts
- Use Fresh Green for positive trends and Deep Navy for baselines. 
- Lines should be smooth (curved) rather than jagged to align with the soft shape language of the design system.