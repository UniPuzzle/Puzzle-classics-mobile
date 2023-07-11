// // function viewDiv4() {
// //    document.getElementById("active-4").style.display = "block";
// // };
// // function viewDiv6() {
// //    document.getElementById("active-6").style.display = "block";
// // };

// // $("active-6").click(function () {
// //    $("active-6").fadeToggle(100);
// // });
// // progress.addEventListener('click', progressBar);
// const progress = document.querySelectorAll('.card__item');
// const left = document.querySelector('.arrow-left');
// const right = document.querySelector('.arrow-right');

// left.addEventListener('click', progressBar);
// right.addEventListener('click', progressBar);

// function progressBar(e) {
//   e.preventDefault();

//   if (e.currentTarget.classList.contains('arrow-left')) {
//     progress.forEach(e => {
//       console.log(e);
//     });
//   }

//   //   // const startPoint = 0;
//   //   let a = (startPoint.scrollLeft = 0);
//   //   let scrollLeftPosition = 1462;
//   //   // cardList.scrollLeft;
//   //   console.log(cardList.scrollWidth);
// }

// const progress = document.querySelector('.progress');
// const cardList = document.querySelector('.card__list');
// const startPoint = document.querySelector('.start');
// const endPoint = document.querySelector('.end');

// cardList.addEventListener('scroll', progressBar);

// function progressBar(e) {
//   // const startPoint = 0;
//   let a = (startPoint.scrollLeft = 0);
//   let scrollLeftPosition = 1462;
//   // cardList.scrollLeft;
//   console.log(cardList.scrollWidth);
// }

const wrapper = document.querySelector('.slides-wrapper');
const carousel = document.querySelector('.slides-carousel');
const firstCardWidth = carousel.querySelector('.card__item').offsetWidth;
const arrowBtns = document.querySelectorAll('.arrow__pagination');
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = false,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add('no-transition');
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove('no-transition');

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = e => {
  isDragging = true;
  carousel.classList.add('dragging');
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = e => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove('dragging');
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove('no-transition');
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove('no-transition');
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(':hover')) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
// autoPlay();

carousel.addEventListener('mousedown', dragStart);
// carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave', autoPlay);
