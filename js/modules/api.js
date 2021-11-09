
const pictureFilters = document.querySelector('.img-filters');
const pictureTitle = document.querySelector('.pictures__title');
const fetchFailMessage = 'Данные с сервера не поступили. Попробуйте снова.';

const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        pictureTitle.classList.remove('visually-hidden');
        pictureFilters.classList.remove('img-filters--inactive');
        return response.json();
      }
      return onFail(fetchFailMessage);
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail(fetchFailMessage);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
