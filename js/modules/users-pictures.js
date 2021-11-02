const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;

const pictureTitle = picturesContainer.querySelector('.pictures__title');


const renderPosts = (postsData) => {
  const picturesListFragment = document.createDocumentFragment();
  pictureTitle.classList.remove('visually-hidden');

  postsData.forEach(({ url, likes, comments }) => {
    const pictureElement = picturesTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesListFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesListFragment);
};

export { renderPosts };
