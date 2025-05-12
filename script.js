class Dropdown {
  constructor(element) {
    this.element = element;
    this.toggle = element.querySelector('.dropdown-toggle');
    this.content = element.querySelector('.dropdown-content');

    this.toggle.addEventListener('click', () => this.toggleDropdown());
  }

  toggleDropdown() {
    this.content.classList.toggle('show');
  }
}

// Initialize all dropdowns on the page
document.querySelectorAll('.dropdown').forEach(dropdownElement => {
  new Dropdown(dropdownElement);
});


// carousel


class Carousel {
  constructor(element) {
    this.element = element;
    this.inner = element.querySelector('.carousel-inner');
    this.items = Array.from(element.querySelectorAll('.carousel-item'));
    this.prevBtn = element.querySelector('.carousel-control.prev');
    this.nextBtn = element.querySelector('.carousel-control.next');
    this.indicatorsContainer = element.querySelector('.carousel-indicators');

    this.currentIndex = 0;
    this.interval = null;
    this.autoScrollDelay = 5000;

    this.initIndicators();
    this.setupEventListeners();
    this.startAutoScroll();
    this.updateCarousel();
  }

  initIndicators() {
    this.items.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => this.goToSlide(index));
      this.indicatorsContainer.appendChild(indicator);
    });

    this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
  }

  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Pause on hover
    this.element.addEventListener('mouseenter', () => this.stopAutoScroll());
    this.element.addEventListener('mouseleave', () => this.startAutoScroll());
  }

  updateCarousel() {
    this.inner.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    // Update active indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateCarousel();
  }

  startAutoScroll() {
    this.stopAutoScroll();
    this.interval = setInterval(() => this.nextSlide(), this.autoScrollDelay);
  }

  stopAutoScroll() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
  const carousel = new Carousel(document.querySelector('.carousel'));
});
