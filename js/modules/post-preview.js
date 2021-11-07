import { getData } from './api.js';
import { showAlert } from '../utils/show-alert.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const IMAGE_TAG = 'IMG';
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
const postCommentsCounter = bigPicture.querySelector('.social__comment-count');
const loadMoreCommentsButton = bigPicture.querySelector('.social__comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePostPreview();
  }
};

const getImageUrl = (evt) => evt.target.src.split('/').slice(-2).join('/');

const clearExistPostComments = () => {
  commentsContainer.innerHTML = '';
};

const renderComments = (postsComments) => {
  const commentsListFragment = document.createDocumentFragment();
  postsComments.forEach(({ avatar, message, name }) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__text').textContent = message;
    commentElement.querySelector('.social__picture').alt = name;
    commentsListFragment.appendChild(commentElement);
  });
  clearExistPostComments();
  commentsContainer.appendChild(commentsListFragment);
};

const fillPostData = (posts, evt) => {
  const index = posts.findIndex((post) => post.url === getImageUrl(evt));

  bigPictureImage.src = posts[index].url;
  bigPictureImage.alt = posts[index].description;
  pictureDescription.textContent = posts[index].description;
  likesCount.textContent = posts[index].likes;
  commentCount.textContent = posts[index].comments.length;

  const arrayOfComments = posts[index].comments;
  renderComments(arrayOfComments);
};

const openPostPreview = (evt) => {
  if (evt.target.tagName === IMAGE_TAG) {
    toggleWindowBlocker();

    getData((postsData) => fillPostData(postsData, evt), showAlert);

    bigPicture.classList.remove('hidden');
    postCommentsCounter.classList.add('hidden');
    loadMoreCommentsButton.classList.add('hidden');

    closeButton.addEventListener('click', closePostPreview);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
};

function closePostPreview() {
  toggleWindowBlocker();

  closeButton.removeEventListener('click', closePostPreview);
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPicture.classList.add('hidden');
}

picturesContaner.addEventListener('click', openPostPreview);
