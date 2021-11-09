const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const pictureFilters = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const discussedFilterButton = pictureFilters.querySelector('#filter-discussed');
const randomFilterButton = pictureFilters.querySelector('#filter-random');
const activeFilterButtonBackground = 'img-filters__button--active';

const getCommentCountValue = (comment) => comment.comments.length;

const compareComments = (commentA, commentB) => {
  const commentsA = getCommentCountValue(commentA);
  const commentsB = getCommentCountValue(commentB);
  return commentsB - commentsA;
};

const removeExisitPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());
};

const changeSelectedFilterBackground = (activeElement, firstInactiveElement, secondInactiveElement) => {
  firstInactiveElement.classList.remove(activeFilterButtonBackground);
  secondInactiveElement.classList.remove(activeFilterButtonBackground);
  activeElement.classList.add(activeFilterButtonBackground);
};

const fillPostData = ({ id, url, likes, comments }, fragment) => {
  const pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = id;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  fragment.appendChild(pictureElement);
};

const renderPosts = (postsData) => {
  const picturesListFragment = document.createDocumentFragment();

  postsData.forEach(({ id, url, likes, comments }) => {
    fillPostData({ id, url, likes, comments }, picturesListFragment);
  });

  removeExisitPictures();
  picturesContainer.appendChild(picturesListFragment);
};

const setDefaultFilterButtonClick = (cb) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
    changeSelectedFilterBackground(defaultFilterButton, discussedFilterButton, randomFilterButton);
  });
};

const renderMostDiscussedPosts = (postsData) => {
  const picturesListFragment = document.createDocumentFragment();

  postsData
    .slice()
    .sort(compareComments)
    .forEach(({ id, url, likes, comments }) => {
      fillPostData({ id, url, likes, comments }, picturesListFragment);
    });

  removeExisitPictures();
  picturesContainer.appendChild(picturesListFragment);
};

const setDiscussedFilterButtonClick = (cb) => {
  discussedFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
    changeSelectedFilterBackground(discussedFilterButton, defaultFilterButton, randomFilterButton);
  });
};

const renderRandomPosts = (postsData) => {
  const randomPicturesCount = 10;
  const picturesListFragment = document.createDocumentFragment();

  postsData
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, randomPicturesCount)
    .forEach(({ id, url, likes, comments }) => {
      fillPostData({ id, url, likes, comments }, picturesListFragment);
    });

  removeExisitPictures();
  picturesContainer.appendChild(picturesListFragment);
};

const setRandomFilterButtonClick = (cb) => {
  randomFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
    changeSelectedFilterBackground(randomFilterButton, discussedFilterButton, defaultFilterButton);
  });
};

export { renderPosts, setDefaultFilterButtonClick, renderMostDiscussedPosts, setDiscussedFilterButtonClick, renderRandomPosts, setRandomFilterButtonClick  };

