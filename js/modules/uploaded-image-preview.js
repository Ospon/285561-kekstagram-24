const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const previewContainer = document.querySelector('.img-upload__preview');
const preview = previewContainer.querySelector('img');

const seeUploadImagePreview = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

fileChooser.addEventListener('change', seeUploadImagePreview);
