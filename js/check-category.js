const categoryBtn = document.querySelector('.block-category__btn');
const categoryTxt = document.querySelector('.block-category__txt');

onclick = function () {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  if (checkboxes.length >= 4) {
    categoryBtn.classList.add('block-category__btn-active');
    categoryTxt.style.opacity = '0';
  } else {
    categoryBtn.classList.remove('block-category__btn-active');
    categoryTxt.style.opacity = '1';
  }
};
