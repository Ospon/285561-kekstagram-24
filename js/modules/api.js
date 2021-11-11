const FETCH_FAIL_MESSAGE = 'Данные с сервера не поступили. Попробуйте снова.';
const SERVER_URL = 'https://24.javascript.pages.academy/kekstagram';

const pictureFilters = document.querySelector('.img-filters');
const pictureTitle = document.querySelector('.pictures__title');

const getData = (onSuccess, onFail) => {
  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        pictureTitle.classList.remove('visually-hidden');
        pictureFilters.classList.remove('img-filters--inactive');
        return response.json();
      }
      return onFail(FETCH_FAIL_MESSAGE);
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail(FETCH_FAIL_MESSAGE);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_URL,
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
