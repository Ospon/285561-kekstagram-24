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
const loadMoreCommentsButton = bigPicture.querySelector('.social__comments-loader');
const showedCommentsCount = bigPicture.querySelector('.showed-comments-count');
const DEFAULT_COMMENTS_VALUE = 5;
let SHOWED_COMMENTS = DEFAULT_COMMENTS_VALUE;
let COMMENT_COLLECTION = [];

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

const updateCommentsList = (commentsCount) => {
  clearExistPostComments();
  const commentsArray = [...COMMENT_COLLECTION];
  commentsArray.slice(0, commentsCount).forEach((item) => commentsContainer.appendChild(item));
  showedCommentsCount.textContent = commentsContainer.children.length;

  if (showedCommentsCount.textContent === commentCount.textContent) {
    loadMoreCommentsButton.classList.add('hidden');
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }
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

  commentsContainer.appendChild(commentsListFragment);
};

const showMoreComments = (evt) => {
  evt.preventDefault();
  SHOWED_COMMENTS = SHOWED_COMMENTS + 5;
  updateCommentsList(SHOWED_COMMENTS);
};

const fillPostData = (posts, evt) => {
  const index = posts.findIndex((post) => post.url === getImageUrl(evt));

  bigPictureImage.src = posts[index].url;
  bigPictureImage.alt = posts[index].description;
  pictureDescription.textContent = posts[index].description;
  likesCount.textContent = posts[index].likes;
  commentCount.textContent = posts[index].comments.length;

  const arrayOfComments = posts[index].comments;

  clearExistPostComments();
  renderComments(arrayOfComments);

  COMMENT_COLLECTION = [];
  SHOWED_COMMENTS = DEFAULT_COMMENTS_VALUE;
  COMMENT_COLLECTION = commentsContainer.querySelectorAll('.social__comment');
  updateCommentsList(SHOWED_COMMENTS);
};

const openPostPreview = (evt) => {
  if (evt.target.tagName === IMAGE_TAG) {
    evt.preventDefault();
    toggleWindowBlocker();

    getData((postsData) => fillPostData(postsData, evt), showAlert);

    bigPicture.classList.remove('hidden');
    closeButton.addEventListener('click', closePostPreview);
    document.addEventListener('keydown', onPopupEscKeydown);
    loadMoreCommentsButton.addEventListener('click', showMoreComments);
  }
};

function closePostPreview() {
  toggleWindowBlocker();

  closeButton.removeEventListener('click', closePostPreview);
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPicture.classList.add('hidden');
  loadMoreCommentsButton.removeEventListener('click', showMoreComments);
}

picturesContaner.addEventListener('click', openPostPreview);


