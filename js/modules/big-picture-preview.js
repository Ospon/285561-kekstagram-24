import { items } from './generate-data.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';
import { isEscapeKey } from '../utils/keys-checks.js';

const bigPicture = document.querySelector('.big-picture');
const usersPicturesContainer = document.querySelector('.pictures');
const closeBugPictureButton = bigPicture.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  toggleWindowBlocker();

  document.addEventListener('keydown', onPopupEscKeydown);
  closeBugPictureButton.addEventListener('click', closeBigPicture);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  toggleWindowBlocker();

  document.removeEventListener('keydown', onPopupEscKeydown);
  closeBugPictureButton.removeEventListener('click', closeBigPicture);
}


usersPicturesContainer.addEventListener('click', (evt) => {
  console.log(evt.target.src);
  const pictureStorage = evt.target.src;

  const arrayElement = items.find((element) => console.log(element.url));
  console.log(arrayElement);

  openBigPicture();
});
