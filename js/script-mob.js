// 1. получить статус input:checked
// 2. разрешить свайп, если хоть один input выбран
const cardList = document.querySelector('.card__list');
const dropMob = document.querySelector('.drop-mob');
const cardItem = document.querySelectorAll('.card__item');
const input = document.querySelectorAll('.input-btn');

addEventListener('click', function () {
  input.forEach(el => {
    if (el.checked) {
      dropMob.classList.add('drop-mob-show');

      // dropMob.style.display = 'block';
      cardList.style.overflow = 'auto';
    }
  });
});

let y;
addEventListener('touchstart', e => (y = e.changedTouches[0].clientY));

addEventListener(
  'touchend',
  e => e.changedTouches[0].clientY - y < -160 && setTimeout(swipeUp, 1000),
);

function swipeUp() {
  cardList.style.overflow = 'hidden';

  dropMob.classList.remove('drop-mob-show');
}
