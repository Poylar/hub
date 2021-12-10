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
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
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
    let innerHeight = event.delegateTarget.querySelector('.faq__content').getBoundingClientRect().height;
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

const modalWrapper = document.querySelector('.modal__wrapper');
const modal = document.querySelectorAll('.modal__item');
document.addEventListener('click', (e) => {
  const target = e.target.closest('.grid__item[data-vacancy]');
  if ((modalWrapper.classList.contains('active') && !e.target.closest('.modal__item')) || e.target.closest('.close')) {
    [modalWrapper, modal].forEach((elem) => {
      elem.classList.remove('active');
    });
  } else if (target) {
    const vacancy = target.dataset.vacancy;
    const modalType = document.querySelector(`.modal__vacancy[data-vacancy="${vacancy}"`);
    if (modalType) {
      [modalWrapper, modalType].forEach((elem) => {
        elem.classList.add('active');
      });
    }
  }
});
