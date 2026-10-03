import { SCENE_ART } from './art-manifest.js';

export const renderers = {
  placeholder(visual, { showDescription = true } = {}) {
    const description = showDescription ? `<div class="visual-description">[VISUAL: ${visual.description || ''}]</div>` : '';
    const stageClass = /[A-Za-z]{2,}/.test(visual.stage || '') ? 'stage stage-text' : 'stage';
    return `<div class="placeholder-visual"><div class="${stageClass}">${visual.stage || ''}</div>${description}</div>`;
  },
  image(visual) { return `<img class="art" src="${visual.src}" alt="${visual.alt || ''}">`; },
  video(visual) { return `<video class="art" src="${visual.src}" autoplay muted loop></video>`; },
};

export function resolveVisual(visual) {
  const src = visual?.type === 'placeholder' && SCENE_ART[visual.id];
  return src ? { type: 'image', src, alt: visual.description, tone: visual.tone } : visual;
}

export function renderVisual(visual, options) {
  if (!visual) return '';
  const resolved = resolveVisual(visual);
  return (renderers[resolved.type] || renderers.placeholder)(resolved, options);
}
