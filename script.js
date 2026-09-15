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
