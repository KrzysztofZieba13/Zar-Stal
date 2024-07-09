/* eslint-disable */
import * as L from 'leaflet';

export const displayMap = () => {
  const map = L.map('map', {
    dragging: false,
    boxZoom: false,
    zoomControl: false,
    scrollWheelZoom: false,
  }).setView([50.18, 22.6], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const marker = L.marker([50.194, 22.59931]).addTo(map);
};
