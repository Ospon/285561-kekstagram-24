import { getData } from './api.js';
import { showAlert } from '../utils/show-alert.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const picturesContaner = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureContainer = bigPicture.querySelector('.big-picture__img');
const bigPictureImage = bigPictureContainer.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.comments-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePostPreview();
  }
};

const openPostPreview = (evt) => {
  evt.preventDefault();
  //console.log(evt.target.src);
  toggleWindowBlocker();
  const imageLink = evt.target.src.split('/').slice(-2).join('/');
  //console.log(imageLink);

  const fillPostData = (pictures) => {
    //console.log(pictures);
    const index = pictures.findIndex((item) => item.url === imageLink);
    //console.log(index);
    bigPictureImage.src = pictures[index].url;
    bigPictureImage.alt = pictures[index].description;
    pictureDescription.textContent = pictures[index].description;
    likesCount.textContent = pictures[index].likes;
    commentCount.textContent = pictures[index].comments.length;
  };

  getData((pictures) => fillPostData(pictures), showAlert);

  bigPicture.classList.remove('hidden');

  closeButton.addEventListener('click', closePostPreview);
  document.addEventListener('keydown', onPopupEscKeydown);
};

function closePostPreview() {
  toggleWindowBlocker();
  closeButton.removeEventListener('click', closePostPreview);
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPicture.classList.add('hidden');
}

picturesContaner.addEventListener('click', openPostPreview);
