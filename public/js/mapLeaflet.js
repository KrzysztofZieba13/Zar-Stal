/* eslint-disable */
import * as L from 'leaflet';

export const displayMap = () => {
  const map = L.map('map', {
    dragging: false,
    boxZoom: false,
    zoomControl: false,
    scrollWheelZoom: false,
  }).setView([50.18, 22.59], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const marker = L.marker([50.19, 22.59]).addTo(map);
};
