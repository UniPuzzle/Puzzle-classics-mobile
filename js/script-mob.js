// 1. получить статус input:checked
// 2. разрешить свайп, если хоть один input выбран
const cardList = document.querySelector('.card__list');
const dropMob = document.querySelector('.drop-mob');
const cardItem = document.querySelectorAll('.card__item');
const input = document.querySelectorAll('.input-btn');

document.body.addEventListener('click', function () {
  input.forEach(el => {
    if (el.checked) {
      dropMob.style.display = 'block';
      cardList.style.overflow = 'auto';
    }
  });
});
