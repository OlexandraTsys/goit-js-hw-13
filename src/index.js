import { form, input, gallery, moreButton } from './js/refs';
import getImages from './js/getimages';
import galleryTemplate from './templates/galleryTemplate.hbs';

import './sass/main.scss';

let inputValue = '';
let pageCounter = 1;

const createMarkup = event => {
  event.preventDefault();

  getImages(inputValue, pageCounter).then(photos => (gallery.innerHTML = galleryTemplate(photos)));

  pageCounter = 1;

  if (!inputValue) {
    moreButton.classList.remove('visible-button');
  }
};

input.addEventListener('input', ({ currentTarget }) => {
  inputValue = currentTarget.value.trim();
});

moreButton.addEventListener('click', () => {
  pageCounter += 1;

  getImages(inputValue, pageCounter).then(photos =>
    gallery.insertAdjacentHTML('beforeend', galleryTemplate(photos)),
  );
});

form.addEventListener('submit', createMarkup);


