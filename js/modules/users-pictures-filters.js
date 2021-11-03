const pictureFilters = document.querySelector('.img-filters');
const discussedFilterButton = pictureFilters.querySelector('#filter-discussed');
//const randomFilterButton = pictureFilters.querySelector('#filter-random');

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const pictureTitle = picturesContainer.querySelector('.pictures__title');


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

const renderMostDiscussedPosts = (postsData) => {
  const picturesListFragment = document.createDocumentFragment();
  pictureTitle.classList.remove('visually-hidden');

  postsData
    .slice()
    .sort(compareComments)
    .forEach(({ url, likes, comments }) => {
      const pictureElement = picturesTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;

      picturesListFragment.appendChild(pictureElement);
    });

  removeExisitPictures();
  picturesContainer.appendChild(picturesListFragment);
};

const setDiscussedFilterButtonClick = (cb) => {
  discussedFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
};

export { setDiscussedFilterButtonClick, renderMostDiscussedPosts, removeExisitPictures };

