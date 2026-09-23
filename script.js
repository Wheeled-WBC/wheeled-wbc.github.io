'use strict';
const figureDialog = document.querySelector('#figure-dialog');
if (figureDialog && typeof figureDialog.showModal === 'function') {
  const expandedImage = figureDialog.querySelector('img');
  const caption = figureDialog.querySelector('.dialog-caption');
  document.querySelectorAll('[data-figure]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const sourceImage = link.querySelector('img');
      expandedImage.src = link.href;
      expandedImage.alt = sourceImage.alt;
      caption.textContent = sourceImage.alt;
      figureDialog.showModal();
    });
  });
  figureDialog.querySelector('.dialog-close').addEventListener('click', () => figureDialog.close());
  figureDialog.addEventListener('click', event => {
    const bounds = figureDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) figureDialog.close();
  });
}

// Respect reduced motion and provide a visible fallback if autoplay is blocked.
const heroVideo = document.querySelector('#hero-video');
const videoToggle = document.querySelector('.video-toggle');
if (heroVideo && videoToggle) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncVideoButton = () => { videoToggle.textContent = heroVideo.paused ? 'Play video' : 'Pause video'; };
  videoToggle.hidden = false;
  heroVideo.addEventListener('play', syncVideoButton);
  heroVideo.addEventListener('pause', syncVideoButton);
  const startVideo = () => heroVideo.play().catch(syncVideoButton);
  if (reducedMotion.matches) heroVideo.pause();
  else startVideo();
  syncVideoButton();
  videoToggle.addEventListener('click', () => {
    if (heroVideo.paused) startVideo();
    else heroVideo.pause();
  });
  reducedMotion.addEventListener('change', event => { if (event.matches) heroVideo.pause(); });
}

// Load experiment media only near the viewport; only visible clips autoplay.
const demoVideos = document.querySelectorAll('.demo-video');
const demoReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function loadDemo(video) {
  const source = video.querySelector('source[data-src]');
  if (source) { source.src = source.dataset.src; source.removeAttribute('data-src'); video.load(); }
}
if ('IntersectionObserver' in window) {
  const loadObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => { if (isIntersecting) { loadDemo(target); loadObserver.unobserve(target); } });
  }, {rootMargin: '250px'});
  const playObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) target.pause();
      else if (!demoReducedMotion.matches) { loadDemo(target); target.play().catch(() => {}); }
    });
  }, {threshold: 0.35});
  demoVideos.forEach(video => { loadObserver.observe(video); playObserver.observe(video); });
} else { demoVideos.forEach(loadDemo); }
demoReducedMotion.addEventListener('change', event => { if (event.matches) demoVideos.forEach(video => video.pause()); });
