const imageEditor = document.querySelector('.img-upload__overlay');
const imageScaleContainer = imageEditor.querySelector('.img-upload__scale');
const scaleValue = imageScaleContainer.querySelector('.scale__control--value');
const scaleBiggerButton = imageScaleContainer.querySelector('.scale__control--bigger');
const scaleSmallerButton = imageScaleContainer.querySelector('.scale__control--smaller');
const bigImagePreview = imageEditor.querySelector('.img-upload__preview').querySelector('img');

const SCALE_STEP = 0.25;
const MAX_SCALE_RANGE = 1;
const MIN_SCALE_RANGE = 0.25;
const DEFAULT_SCALE_VALUE = '100%';

let currentScaleValue =  parseInt(scaleValue.value, 10) / 100;

const setDefaultImageScale = () => {
  scaleValue.value = DEFAULT_SCALE_VALUE;
  const defaultCOntainer = parseInt(scaleValue.value, 10) / 100;
  bigImagePreview.style.transform = `scale(${defaultCOntainer})`;
  currentScaleValue = defaultCOntainer;
};

const increaseImageScale = () => {
  if (currentScaleValue < MAX_SCALE_RANGE) {
    currentScaleValue = currentScaleValue + SCALE_STEP;
    bigImagePreview.style.transform = `scale(${currentScaleValue})`;
    scaleValue.value = `${currentScaleValue * 100}%`;
  }
};

const decreaseImageScale = () => {
  if (currentScaleValue > MIN_SCALE_RANGE) {
    currentScaleValue = currentScaleValue - SCALE_STEP;
    bigImagePreview.style.transform = `scale(${currentScaleValue})`;
    scaleValue.value = `${currentScaleValue * 100}%`;
  }
};

export { scaleBiggerButton, scaleSmallerButton, increaseImageScale, decreaseImageScale, setDefaultImageScale };