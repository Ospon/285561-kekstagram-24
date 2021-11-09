import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const IMAGE_TAG = 'IMG';
const DEFAULT_COMMENTS_VALUE = 5;
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
let showedComments = DEFAULT_COMMENTS_VALUE;
let commentsCollection = [];

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePostPreview();
  }
};

const clearExistPostComments = () => {
  commentsContainer.innerHTML = '';
};

const updateCommentsList = (commentsCount) => {
  clearExistPostComments();
  const commentsArray = [...commentsCollection];
  commentsArray.slice(0, commentsCount).forEach((item) => commentsContainer.appendChild(item));
  showedCommentsCount.textContent = commentsContainer.children.length;

  showedCommentsCount.textContent === commentCount.textContent ? loadMoreCommentsButton.classList.add('hidden') : loadMoreCommentsButton.classList.remove('hidden');
};

const showMoreComments = (evt) => {
  evt.preventDefault();
  showedComments = showedComments + 5;
  updateCommentsList(showedComments);
};

const initializePostComments = () => {
  commentsCollection = [];
  showedComments = DEFAULT_COMMENTS_VALUE;
  commentsCollection = commentsContainer.querySelectorAll('.social__comment');
  updateCommentsList(showedComments);
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

const fillPostData = (posts, evt) => {
  const index = posts.findIndex((post) => post.url === evt.target.src.split('/').slice(-2).join('/'));

  bigPictureImage.src = posts[index].url;
  bigPictureImage.alt = posts[index].description;
  pictureDescription.textContent = posts[index].description;
  likesCount.textContent = posts[index].likes;
  commentCount.textContent = posts[index].comments.length;

  const arrayOfComments = posts[index].comments;

  clearExistPostComments();
  renderComments(arrayOfComments);
  initializePostComments();
};

const openPostPreview = (postData, evt) => {
  if (evt.target.nodeName === IMAGE_TAG) {
    toggleWindowBlocker();
    fillPostData(postData, evt);

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

const setOpenPostPreviewClick = (cb) => {
  picturesContaner.addEventListener('click', (evt) => {
    cb(evt);
  });
};

export { openPostPreview, setOpenPostPreviewClick };


