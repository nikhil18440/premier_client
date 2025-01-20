// Carousel.js
'use client'
import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    { id: 1, image: 'model1.jpg', alt: 'Image 1' },
    { id: 2, image: 'model2.jpg', alt: 'Image 2' },
    { id: 3, image: 'model3.jpg', alt: 'Image 3' },
  ]);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-prev" onClick={handlePrevClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="carousel-next" onClick={handleNextClick}>
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
            onClick={() => handleIndicatorClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;