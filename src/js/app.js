import '../scss/app.scss';

function requireAll(r) {
  // get all svg
  r.keys().forEach(r);
}

requireAll(require.context('../images/svg/', true, /\.svg$/));

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const roundBlock = document.querySelector('.round-svg');
window.addEventListener('scroll', () => {
  if (isInViewport(roundBlock)) {
    roundBlock.classList.add('svg-animated');
  }
});
