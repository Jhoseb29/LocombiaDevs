const carouselContainer = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentPosition = 0;
const slideWidth = carouselContainer.offsetWidth;

prevButton.addEventListener('click', () => {
  currentPosition += slideWidth;
  if (currentPosition > 0) {
    currentPosition = -(slideWidth * (carouselContainer.children.length - 1));
  }
  carouselContainer.style.transform = `translateX(${currentPosition}px)`;
});

nextButton.addEventListener('click', () => {
  currentPosition -= slideWidth;
  if (currentPosition < -(slideWidth * (carouselContainer.children.length - 1))) {
    currentPosition = 0;
  }
  carouselContainer.style.transform = `translateX(${currentPosition}px)`;
});
