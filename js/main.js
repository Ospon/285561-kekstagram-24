import './utils/get-random-positive-integer.js';
import './modules/form-image-upload.js';

import { renderPosts, setDefaultFilterButtonClick } from './modules/users-pictures.js';
import { getData } from './modules/api.js';
import { showAlert } from './utils/show-alert.js';
import { setDiscussedFilterButtonClick, renderMostDiscussedPosts } from './modules/users-pictures-filters.js';

getData((pictures) => {
  renderPosts(pictures);
  setDiscussedFilterButtonClick(() => renderMostDiscussedPosts(pictures));
  setDefaultFilterButtonClick(() =>renderPosts(pictures));
}, showAlert);
