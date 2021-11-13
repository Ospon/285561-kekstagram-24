const SCALE_STEP = 0.25;
const MAX_SCALE_RANGE = 1;
const MIN_SCALE_RANGE = 0.25;
const DEFAULT_SCALE_VALUE = '100%';

const imageEditor = document.querySelector('.img-upload__overlay');
const imageScaleContainer = imageEditor.querySelector('.img-upload__scale');
const scaleValue = imageScaleContainer.querySelector('.scale__control--value');
const scaleBiggerButton = imageScaleContainer.querySelector('.scale__control--bigger');
const scaleSmallerButton = imageScaleContainer.querySelector('.scale__control--smaller');
const bigImagePreview = imageEditor.querySelector('.img-upload__preview').querySelector('img');

let currentScaleValue =  parseInt(scaleValue.value, 10) / 100;

const setDefaultImageScale = () => {
  scaleValue.value = DEFAULT_SCALE_VALUE;
  const defaultContainer = parseInt(scaleValue.value, 10) / 100;
  bigImagePreview.style.transform = `scale(${defaultContainer})`;
  currentScaleValue = defaultContainer;
};

const onImageScaleIncrease = () => {
  if (currentScaleValue < MAX_SCALE_RANGE) {
    currentScaleValue = currentScaleValue + SCALE_STEP;
    bigImagePreview.style.transform = `scale(${currentScaleValue})`;
    scaleValue.value = `${currentScaleValue * 100}%`;
  }
};

const onImageScaleDecrease = () => {
  if (currentScaleValue > MIN_SCALE_RANGE) {
    currentScaleValue = currentScaleValue - SCALE_STEP;
    bigImagePreview.style.transform = `scale(${currentScaleValue})`;
    scaleValue.value = `${currentScaleValue * 100}%`;
  }
};

export { scaleBiggerButton, scaleSmallerButton, onImageScaleIncrease, onImageScaleDecrease, setDefaultImageScale };
