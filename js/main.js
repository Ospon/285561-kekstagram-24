import './utils/get-random-positive-integer.js';
import './modules/form-image-upload.js';
import { debounce } from './utils/debounce.js';
import './modules/live-image-preview.js';
import './modules/post-preview.js';

import { renderPosts, setDefaultFilterButtonClick, renderMostDiscussedPosts, setDiscussedFilterButtonClick, renderRandomPosts, setRandomFilterButtonClick } from './modules/users-pictures.js';
import { getData } from './modules/api.js';
import { showAlert } from './utils/show-alert.js';

getData((pictures) => {
  renderPosts(pictures);
  setDiscussedFilterButtonClick(debounce(() => renderMostDiscussedPosts(pictures)));
  setDefaultFilterButtonClick(debounce(() =>renderPosts(pictures)));
  setRandomFilterButtonClick(debounce(() => renderRandomPosts(pictures)));
}, showAlert);
