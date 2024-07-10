/*eslint-disable */
const images = [
  '../img/hero-bg/showslide/showslide-1.jpg',
  '../img/hero-bg/showslide/showslide-2.jpg',
  '../img/hero-bg/showslide/showslide-3.jpg',
  '../img/hero-bg/showslide/showslide-4.jpg',
  '../img/hero-bg/showslide/showslide-5.jpg',
];

export const initSlider = (heroElement) => {
  const preloadingBox = document.querySelector('.img--bg-preloading');
  heroElement.style.backgroundImage = `url(${images[0]})`;
  preloadingBox.src = images[1];

  let i = 1;
  setInterval(() => {
    heroElement.style.backgroundImage = `url(${images[i++]})`;

    if (i === images.length) i = 0;
    else preloadingBox.src = images[i];
  }, 7000);
};
