/*eslint-disable */
import * as nav from './nav';
import ImageGallery from './gallery/imageGallery';
import SingleGallery from './gallery/singleGallery';
import * as mapLeaflet from './mapLeaflet';
import * as interObserver from './interObserver';
import { initSlider } from './heroSlideshow';
import * as editMainPage from './admin/editMainPage';

const sectionSingleRealization = document.querySelector(
  '.section--single-realization',
);
const navBar = document.querySelector('.nav-container');
const realizationCartElements = document.querySelectorAll(
  '.realization--cart-element',
);
const intersectionHeader = document.querySelector('.intersection-header');
const mapContainer = document.getElementById('map');
const mainPage = document.querySelector('.overview-header');
const manyRealizationsPage = document.querySelector('.realizations-header');
const eMainPage = document.querySelector('.edit-mp');

let navListener = false;

// GALLERY FOR ONE REALIZATION
if (sectionSingleRealization) {
  new SingleGallery('single-realizations');
}

if (!navListener) {
  nav.initNavHandlers();
  navListener = true;
}

// GALLERY FOR MANY REALIZATIONS
if (realizationCartElements) {
  realizationCartElements.forEach((cart) => {
    new ImageGallery(cart.id);
  });
}

if (intersectionHeader) nav.initIntersectionApi();

if (mapContainer) mapLeaflet.displayMap();

if (manyRealizationsPage || mainPage) {
  interObserver.initRevalSections();
  interObserver.initLoadLazyImg();
}

if (mainPage) {
  interObserver.initLoadLazyImg();
  initSlider(mainPage);
}

// Edit MP desc and title
if (eMainPage) {
  editMainPage.init();
}
