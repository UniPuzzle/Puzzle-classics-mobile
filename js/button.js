var buttons = document.querySelectorAll('.button');
//обробка кліка на головну кнопку
let onClickMainButton = function (e, button) {
  if (!button.classList.contains('active')) {
    //якщо кнопка не була натиснута (немає класу .active)
    button.classList.add('active');
  } else {
    //якщо кнопку вже було натиснуто

    console.log('Button was clicked second time');
  }
};

// обробка кліку на внутрішню кнопку
let onClickSubButton = function (button) {
  buttons.forEach(function a(button) {
    button.onclick = function (e) {
      if (e.target.classList.contains('sub-button')) {
        button.classList.add('active--error');
      }
    };
  });

  // button -головна кнопка, в якій знаходиться внутрішня кнопка

  console.log('Handle click on sub button');
};

//логіка кліків на всі кнопки винесена у функцію
let handleButtonClick = function () {
  //знаходимо всі кнопки

  if (!buttons.length) return;

  //додаємо обробник кліку для кожної кнопки
  buttons.forEach(function (button) {
    button.onfocus = function (e) {
      buttons.forEach(function (button) {
        button.classList.remove('active');
      });

      // перевіряємо, на який елемент було здійснено клік
      // якщо клікнута внутрішня кнопка, не обробляти це як клік на головну кнопку
      // (якщо таргет елемент містить клас sub-button - клік на внутрішню кнопку)
      if (!e.target.classList.contains('sub-button')) {
        onClickMainButton(e, button);
      }
    };

    // для кожної головної кнопки знаходимо внутрішню кнопку
    var subButton = button.querySelector('.sub-button');
    // якщо вона є, додаємо обробник кліку для неї
    if (subButton) {
      subButton.onclick = function (e) {
        e.preventDefault();
        onClickSubButton(e, button);
      };
    }
  });
};

handleButtonClick();
