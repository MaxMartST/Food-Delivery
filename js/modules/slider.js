"use strict";
import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper}) {
    //Slider
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.classList.add('dot-active');
        }

        indicators.append(dot);
        dots.push(dot);
    }

    // Mark active dot
    function markDot(dots, slideNumber) {
        dots.forEach(dot => dot.classList.remove('dot-active'));
        dots[slideNumber -1].classList.add('dot-active');
    }

    // Scrolling slider version 2
    showSlides(slideIndex);
    total.textContent = getZero(slides.length);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.classList.add('hide'));
        slides[slideIndex - 1].classList.remove('hide');

        current.textContent = getZero(slideIndex);
        markDot(dots, slideIndex);
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });

    // Dot controls slider and counter
    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = +slideTo;

            // Scrolling slider version 2
            showSlides(slideIndex);
            markDot(dots, slideIndex);
        });
    });
}

export default slider;