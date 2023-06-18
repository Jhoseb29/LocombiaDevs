const carousel = document.querySelector('.carousel-container');
let currentPosition = 0;
let timer;

function moveNext() {
  const carouselContainer = document.querySelector('.carousel-container');
  const slideWidth = carouselContainer.offsetWidth;
  currentPosition -= slideWidth;
  if (currentPosition < -(slideWidth * (carouselContainer.children.length - 1))) {
    currentPosition = 0;
  }
  carouselContainer.style.transform = `translateX(${currentPosition}px)`;
  
}

function startTimer() {
  timer = setInterval(moveNext, 10000); // Cambia de imagen cada 10 segundos
}

function stopTimer() {
  clearInterval(timer);
}

startTimer(); // Comienza el temporizador al cargar la página

// Opcional: Pausar el temporizador cuando el mouse pasa sobre el carrusel
// carousel.addEventListener('mouseenter', stopTimer);
// carousel.addEventListener('mouseleave', startTimer);
