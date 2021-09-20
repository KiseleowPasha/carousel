import React, { useEffect, useRef, useState } from "react";
import Slide from "../slide/slide";
import "./carousel.css";
import contentJSON from "../../db/content.json";

function Carousel() {
  const [content, setContent] = useState(contentJSON);
  const [currentSlide, setCurrentSlide] = useState(
    content.find((slide) => slide.id === 1)
  );
  const slides = useRef(null);
  const arrayOfSlides = content;
  let touchStart = 0;
  let touchEnd = 0;

  const changeSlide = (number) => {
    if (number === 0) {
      setCurrentSlide(content.find((slide) => slide.id === content.length));
    } else if (number === content.length + 1) {
      setCurrentSlide(content.find((slide) => slide.id === 1));
    } else {
      setCurrentSlide(content.find((slide) => slide.id === number));
    }
  };

  const animateSlides = () => (slides.current.style.animation = "slides 1s");

  const onTouchStart = ({ changedTouches }) =>
    (touchStart = changedTouches[0].clientX);
  const onTouchEnd = ({ changedTouches }) => {
    touchEnd = changedTouches[0].clientX;
    if (touchStart - touchEnd > 0)
      touchStart - touchEnd > 100
        ? changeSlide(currentSlide.id + 1)
        : changeSlide(currentSlide.id);
    else
      touchStart - touchEnd < -100
        ? changeSlide(currentSlide.id - 1)
        : changeSlide(currentSlide.id);
    slides.current.style.left ? (slides.current.style.left = null) : null;
  };

  const onTouchMove = ({ changedTouches }) =>
    (slides.current.style.left = changedTouches[0].clientX - touchStart + "px");

  useEffect(() => {
    slides.current.style.animation
      ? setTimeout(() => (slides.current.style.animation = null), 1000)
      : null;
  });

  return (
    <div className="carousel">
      <span className="carousel-title">{`Архитектура-${currentSlide.id}`}</span>
      <div className="slider">
        <div
          className="arrow-left"
          onClick={() => changeSlide(currentSlide.id - 1)}
        ></div>
        <div
          className="slides"
          ref={slides}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {arrayOfSlides.map((slide) => (
            <Slide
              key={slide.id}
              slide={slide}
              currentSlideId={currentSlide.id}
            />
          ))}
        </div>
        <div
          className="arrow-right"
          onClick={() => changeSlide(currentSlide.id + 1)}
        ></div>
      </div>
      <div className="pagination">
        {content.map((circle) => (
          <div
            className={
              circle.id === currentSlide.id ? "circle active-circle" : "circle"
            }
            key={circle.id}
            onClick={() => {
              changeSlide(circle.id);
              animateSlides();
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
