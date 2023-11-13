function progressView() {
  let diagramBox = document.querySelectorAll('.diagram.progress');
  diagramBox.forEach(box => {
    let deg = (360 * box.dataset.percent) / 100 + 180;
    if (box.dataset.percent >= 50) {
      box.classList.add('over_50');
    } else {
      box.classList.remove('over_50');
    }
    box.querySelector('.piece.right').style.transform =
      'rotate(' + deg + 'deg)';
  });
}
progressView();

function timer(seconds) {
  let diagramBox = document.querySelector('.diagram.timer');
  seconds = seconds || diagramBox.dataset.seconds;

  let deg = (360 * seconds) / diagramBox.dataset.seconds + 180;
  if (seconds >= diagramBox.dataset.seconds / 2) {
    diagramBox.classList.add('over_50');
  } else {
    diagramBox.classList.remove('over_50');
  }

  diagramBox.querySelector('.piece.right').style.transform =
    'rotate(' + deg + 'deg)';
  diagramBox.querySelector('.text b').innerText = seconds;

  setTimeout(function () {
    timer(seconds - 1);
  }, 1000);
}
timer();
