"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

const Slide = ({ src, index, current, handleSlideClick, handlePreviousClick, handleNextClick }) => {
  const slideRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event) => {
    event.currentTarget.style.opacity = "1";
  };

  return (
    <li
      ref={slideRef}
      className="relative w-full h-full flex-shrink-0 overflow-hidden rounded-xl"
      onClick={() => handleSlideClick(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: current !== index ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="absolute inset-[-10%] transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)`,
        }}
      >
        <img
          className="w-full h-full object-cover transition-opacity duration-600 ease-in-out rounded-xl"
          style={{
            opacity: current === index ? 1 : 0.5,
          }}
          alt={`Slide ${index + 1}`}
          src={src}
          onLoad={imageLoaded}
          loading="eager"
          decoding="sync"
        />
      </div>

      {current === index && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-10">
          <CarouselControl type="previous" title="Go to previous slide" handleClick={handlePreviousClick} />
          <CarouselControl type="next" title="Go to next slide" handleClick={handleNextClick} />
        </div>
      )}
    </li>
  );
};

const CarouselControl = ({ type, title, handleClick }) => {
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center bg-white/25 hover:bg-white/50 rounded-full focus:outline-none transition-all duration-200 hover:-translate-y-1 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <IconArrowNarrowRight className="text-white" />
    </button>
  );
};

export function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-full max-h-[50vh] overflow-hidden rounded-xl"
      style={{ aspectRatio: "16 / 9" }}
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((src, index) => (
          <Slide
            key={index}
            src={src}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
          />
        ))}
      </ul>
    </div>
  );
}