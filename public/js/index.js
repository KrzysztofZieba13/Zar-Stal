/*eslint-disable */
import * as nav from './nav';
import ImageGallery from './gallery/imageGallery';
import SingleGallery from './gallery/singleGallery';
import * as mapLeaflet from './mapLeaflet';
import * as interObserver from './interObserver';
import { initSlider } from './heroSlideshow';
import * as editMainPage from './admin/editMainPage';
import * as navInit from './admin/accordionNavEdit';
import * as formAccordionEdit from './admin/accordionFormEdit';
import * as realizationImages from './admin/realizationImages';
import { deleteRealization } from './admin/deleteRealization';
import { deleteElement } from './admin/deleteElement';

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
const editNav = document.querySelector('.edit-nav');
const editFormAccordion = document.querySelector('.accordion--edit-panel');
const editFormSpecs = document.querySelector('.accordion--edit-specs');
const imagesToDelete = document.querySelector('.choose--images-delete');
const sectionDeleteRealization = document.querySelector(
  '.section--delete-realization',
);
const sectionDeleteElement = document.querySelector('.section--delete-element');

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

// Edit page navigation
if (editNav) {
  navInit.init();
}

// Edit form accordion
if (editFormAccordion) formAccordionEdit.init();

// Delete images from realization
if (imagesToDelete) realizationImages.init();

// Add or Delete field inputs for adding specifications | Delete specifications
if (editFormSpecs) {
  formAccordionEdit.specificationInput('add');
  formAccordionEdit.specificationInput('delete');
  formAccordionEdit.selectSpecsToDeleteHandler();
}

// Delete Realization
if (sectionDeleteRealization) deleteRealization();

//Delete Element
if (sectionDeleteElement) deleteElement();
