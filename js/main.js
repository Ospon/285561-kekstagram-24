import './utils/get-random-positive-integer.js';
import './modules/form-image-upload.js';

import { renderPosts } from './modules/users-pictures.js';
import { getData } from './modules/api.js';
import { showAlert } from './utils/show-alert.js';

getData(renderPosts, showAlert);

