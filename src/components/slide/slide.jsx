import React, { useState } from "react";
import "./slide.css";
import contentJSON from "../../db/content.json";

function Slide(props) {
  const [content, setContent] = useState(contentJSON);
  let className = "slide";
  initClassName();

  function initClassName() {
    if (props.currentSlideId === props.slide.id)
      className = "current-slide slide";
    else if (
      props.slide.id - props.currentSlideId === 1 ||
      (props.slide.id === 1 && props.currentSlideId === content.length)
    )
      className = "next-slide slide";
    else if (
      props.currentSlideId - props.slide.id === 1 ||
      (props.slide.id === content.length && props.currentSlideId === 1)
    )
      className = "prev-slide slide";
    else if (
      props.currentSlideId === 1 &&
      props.slide.id === content.length - 1
    )
      className = "invisible-prev-slide slide";
    else if (props.currentSlideId === 2 && props.slide.id === content.length)
      className = "invisible-prev-slide slide";
    else if (props.currentSlideId - props.slide.id === 2)
      className = "invisible-prev-slide slide";
    else if (props.currentSlideId === content.length && props.slide.id === 2)
      className = "invisible-next-slide slide";
    else if (
      props.currentSlideId === content.length - 1 &&
      props.slide.id === 1
    )
      className = "invisible-next-slide slide";
    else if (props.slide.id - props.currentSlideId === 2)
      className = "invisible-next-slide slide";
  }

  return (
    <div className={className}>
      <figure className="slide-img-container">
        <img src={props.slide.img} alt="Изображение на слайде" />
      </figure>
    </div>
  );
}

export default Slide;
