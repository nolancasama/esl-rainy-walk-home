import { SCENE_ART } from './art-manifest.js';

export const renderers = {
  placeholder(visual, { showDescription = true } = {}) {
    const description = showDescription
      ? `<div class="visual-description">[VISUAL: ${visual.description || ''}]</div>`
      : '';

    const stage = visual.stage || '';
    // Words in the stage (a tag, a nameplate) would overflow at emoji size.
    const stageClass = /[A-Za-z]{2,}/.test(stage) ? 'stage stage-text' : 'stage';

    return `<div class="${stageClass}">${stage}</div>${description}`;
  },

  // The whole picture stays visible; a blurred copy fills the spare width.
  image(visual) {
    return `
      <img class="art-backdrop" src="${visual.src}" alt="" aria-hidden="true">
      <img class="art" src="${visual.src}" alt="${visual.alt || ''}">
    `;
  },

  video(visual) {
    return `<video src="${visual.src}" autoplay muted loop></video>`;
  },
};

// A placeholder with a finished image (see art/build-manifest.mjs) renders as that image.
export function resolveVisual(visual) {
  const src = visual?.type === 'placeholder' && SCENE_ART[visual.description];
  return src ? { type: 'image', src, alt: visual.description, tone: visual.tone } : visual;
}

export function renderVisual(visual, options) {
  if (!visual) {
    return '';
  }

  const resolved = resolveVisual(visual);
  return (renderers[resolved.type] || renderers.placeholder)(resolved, options);
}
