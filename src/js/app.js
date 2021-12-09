import '../scss/app.scss';

const delegateHandler = (selector, handler) => (event) => {
  const possibleTarget = event.target.closest(selector);
  if (possibleTarget) {
    event.delegateTarget = possibleTarget;
    handler(event);
  }
};

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

document.addEventListener(
  'click',
  delegateHandler('.faq__item', (event) => {
    let innerHeight = event.delegateTarget
      .querySelector('.faq__content')
      .getBoundingClientRect().height;
    console.log(innerHeight);
    let item = event.delegateTarget.querySelector('.faq__content-wrapper');
    if (event.delegateTarget.classList.contains('active')) {
      item.style.height = `0`;
      event.delegateTarget.classList.remove('active');
    } else {
      item.style.height = `${innerHeight}px`;
      event.delegateTarget.classList.add('active');
    }
  })
);

document.addEventListener('click', (e) => {
  if (e.target.closest('.grid__item[data-vacancy]')) {
    const vacancy = e.target.dataset.vacancy;
    console.log(vacancy);
    const modal = document.querySelector(
      `.modal__vacancy[data-vacancy="${vacancy}"`
    );
    document.querySelector('.modal__wrapper').classList.add('active');
    modal.classList.add('active');
  } else if (e.target.closest('.modal__wrapper .close') || !e.target.closest('.modal__vacancy')) {
    document.querySelector('.modal__wrapper').classList.remove('active');
    document.querySelectorAll('.modal__vacancy').forEach((elem) => {
      elem.classList.remove('active');
    });
  }
});
