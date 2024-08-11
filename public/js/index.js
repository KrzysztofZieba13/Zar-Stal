/*eslint-disable */
import * as nav from './nav';
import ImageGallery from './gallery/imageGallery';
import SingleGallery from './gallery/singleGallery';
import * as mapLeaflet from './mapLeaflet';
import * as interObserver from './interObserver';
import { initSlider } from './heroSlideshow';
import * as editMainPage from './admin/editMainPage';
import * as realizationImages from './admin/realizationImages';
import { deleteRealization } from './admin/deleteRealization';
import { deleteElement } from './admin/deleteElement';
import * as realizationManage from './admin/realizationsManagement';
import * as editContact from './admin/editContact';
import * as navInit from './admin/accordionNavEdit';
import * as formAccordionEdit from './admin/accordionFormEdit';
import * as elementManage from './admin/elementsManagement';
import * as email from './email';

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
const eMainRealizations = document.querySelector(
  '.edit-mp-choose-realizations',
);
const editNav = document.querySelector('.edit-nav');
const editFormAccordion = document.querySelector('.accordion--edit-panel');
const editFormSpecs = document.querySelector('.accordion--edit-specs');
const imagesToDelete = document.querySelector('.choose--images-delete');
const sectionDeleteRealization = document.querySelector(
  '.section--delete-realization',
);
const sectionDeleteElement = document.querySelector('.section--delete-element');
const sectionCreateRealization = document.querySelector(
  '.section--create-realization',
);
const sectionEditOffert = document.querySelector('.section--edit-offert');
const sectionEditContact = document.querySelector('.section--edit-contact');
const sectionUpdateRealization = document.querySelector(
  '.section--update-realization',
);
const sectionCreateElement = document.querySelector('.section--create-element');
const sectionUpdateElement = document.querySelector('.section--update-element');
const contactForm = document.querySelector('.form-contact');

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

// Edit main realizations
if (eMainRealizations) {
  editMainPage.chooseMainRealizations();
}

if (editNav) {
  // Edit page navigation
  navInit.init();
}

// Create Realization
if (sectionCreateRealization) {
  realizationManage.createRealization();
  formAccordionEdit.specificationInput('add');
  formAccordionEdit.specificationInput('delete');
}

if (editFormAccordion)
  // Edit form accordion
  formAccordionEdit.init();

// Delete images from realization
if (imagesToDelete) realizationImages.init();

// Delete Realization
if (sectionDeleteRealization) deleteRealization();

// Delete Element
if (sectionDeleteElement) deleteElement();

// Edit Offert
if (sectionEditOffert) editMainPage.editOffert();

// Edit Contact && Openhours
if (sectionEditContact) {
  editContact.editContact();
  editContact.editOpenHours();
}

// Update Realization
if (sectionUpdateRealization) {
  realizationManage.updateRealization();
}

// Add or Delete field inputs for adding specifications | Delete specifications
if (editFormSpecs) {
  formAccordionEdit.specificationInput('add');
  formAccordionEdit.specificationInput('delete');
  // formAccordionEdit.selectSpecsToDeleteHandler();
}

// Create Element
if (sectionCreateElement) {
  elementManage.createElement();
}

// Update Element
if (sectionUpdateElement) {
  elementManage.updateElement();
}

// Contact Us Form
if (contactForm) {
  email.contactUsHandler();
}
