const track = document.querySelector('.slider-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');
const currentText = document.querySelector('#current');
const totalText = document.querySelector('#total');

const totalSlides = slides.length;
let currentIndex = 1;

// Clone the first and last slides so the slider can loop smoothly.
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  dot.setAttribute('aria-label', `Go to image ${i + 1}`);
  dot.addEventListener('click', () => {
    currentIndex = i + 1;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
}

const dots = Array.from(document.querySelectorAll('.dot'));
totalText.textContent = String(totalSlides).padStart(2, '0');

function updateSlider(animate = true) {
  track.style.transition = animate ? 'transform 0.5s ease' : 'none';
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  const realIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  currentText.textContent = String(realIndex + 1).padStart(2, '0');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === realIndex);
  });
}

nextButton.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
});

prevButton.addEventListener('click', () => {
  currentIndex--;
  updateSlider();
});

track.addEventListener('transitionend', () => {
  if (currentIndex === totalSlides + 1) {
    currentIndex = 1;
    updateSlider(false);
  } else if (currentIndex === 0) {
    currentIndex = totalSlides;
    updateSlider(false);
  }
});

window.addEventListener('resize', () => updateSlider(false));

document.querySelector('#copyright-button').addEventListener('click', () => {
  alert(`Copyright © ${new Date().getFullYear()} Roj Shrestha`);
});
document.querySelector('#year').textContent = new Date().getFullYear();

updateSlider(false);
