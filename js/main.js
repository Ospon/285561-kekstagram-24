import './modules/form-image-upload.js';
import './modules/uploaded-image-preview.js';
import { debounce } from './utils/debounce.js';
import { openPostPreview, setOpenPostPreviewClick} from './modules/post-preview.js';

import { renderPosts, setDefaultFilterButtonClick, renderMostDiscussedPosts, setDiscussedFilterButtonClick, renderRandomPosts, setRandomFilterButtonClick } from './modules/users-pictures.js';
import { getData } from './modules/api.js';
import { showAlert } from './utils/show-alert.js';

getData((pictures) => {
  renderPosts(pictures);
  setDiscussedFilterButtonClick(debounce(() => renderMostDiscussedPosts(pictures)));
  setDefaultFilterButtonClick(debounce(() => renderPosts(pictures)));
  setRandomFilterButtonClick(debounce(() => renderRandomPosts(pictures)));
  setOpenPostPreviewClick((evt) => openPostPreview(pictures, evt));
}, showAlert);
