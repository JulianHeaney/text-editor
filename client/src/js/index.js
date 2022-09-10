import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';

import { getDB } from './database';

import '../css/style.css';

import Logo from '../images/logo.png';

window.addEventListener('load', function() {
  getDB();
  document.getElementById('logo').src = Logo;
});

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

if ('serviceWorker' in navigator) {
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}