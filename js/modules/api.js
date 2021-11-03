
const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return onFail('Данные с сервера не поступили. Попробуйте снова.');
      }
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail('Данные с сервера не поступили. Попробуйте снова.');
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