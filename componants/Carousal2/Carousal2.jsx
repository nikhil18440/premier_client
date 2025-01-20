// Carousel.js
'use client'
import React, { useState, useEffect } from 'react';
import './Carousel2.css';

const Carousel2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    { id: 1, image: 'model1.jpg', alt: 'Image 1' },
    { id: 2, image: 'model2.jpg', alt: 'Image 2' },
    { id: 3, image: 'model1.jpg', alt: 'Image 3' },
    { id: 4, image: 'model1.jpg', alt: 'Image 4' },
    { id: 5, image: 'model1.jpg', alt: 'Image 5' },
  ]);

  const handleScroll = (event) => {
    const carouselInner = event.target;
    const scrollPosition = carouselInner.scrollLeft;
    const slideWidth = carouselInner.children[0].offsetWidth;
    const newSlide = Math.round(scrollPosition / slideWidth);
    setCurrentSlide(newSlide);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" onScroll={handleScroll}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="carousel-item">
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          className="carousel-prev"
          onClick={() => {
            const carouselInner = document.querySelector('.carousel-inner');
            carouselInner.scrollLeft -= carouselInner.children[0].offsetWidth;
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className="carousel-next"
          onClick={() => {
            const carouselInner = document.querySelector('.carousel-inner');
            carouselInner.scrollLeft += carouselInner.children[0].offsetWidth;
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => {
              const carouselInner = document.querySelector('.carousel-inner');
              carouselInner.scrollLeft = index * carouselInner.children[0].offsetWidth;
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel2;