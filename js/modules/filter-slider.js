const imageEditor = document.querySelector('.img-upload__overlay');
const sliderElement = imageEditor.querySelector('.effect-level__slider');
const sliderBackground = imageEditor.querySelector('.img-upload__effect-level');
const effectValue = imageEditor.querySelector('.effect-level__value');
const imagePreview = imageEditor.querySelector('.img-upload__preview');
const sliderOptions = {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
};

function FilterEffect(className, name, sliderMinRange, sliderMaxRange, sliderStep, sliderStart, styleProperty, stylePropertyValue, isSliderActive) {
  this.className = className;
  this.name = name;
  this.sliderMinRange = sliderMinRange;
  this.sliderMaxRange = sliderMaxRange;
  this.sliderStep = sliderStep;
  this.sliderStart = sliderStart;
  this.styleProperty = styleProperty;
  this.stylePropertyValue = stylePropertyValue;
  this.isSliderActive = isSliderActive;
}

const effects = {
  CHROME: new FilterEffect('effects__preview--chrome', 'chrome', 0, 1, 0.1, 1, 'grayscale', '', true),
  SEPIA: new FilterEffect('effects__preview--sepia', 'sepia', 0, 1, 0.1, 1, 'sepia', '', true),
  MARVIN: new FilterEffect('effects__preview--marvin', 'marvin', 0, 100, 1, 100, 'invert', '%', true),
  PHOBOS: new FilterEffect('effects__preview--phobos', 'phobos', 0, 3, 0.1, 3, 'blur', 'px', true),
  HEAT: new FilterEffect('effects__preview--heat', 'heat', 1, 3, 0.1, 3, 'brightness', '', true),
  NONE: new FilterEffect('', 'none', 0, 1, 0.1, 0, '', '', false),
};

const removeEffectClasses = (element) => {
  element.classList.remove(effects.CHROME.className, effects.SEPIA.className, effects.MARVIN.className, effects.PHOBOS.className, effects.HEAT.className);
};

const addEffectClass = (element, effectName) => {
  removeEffectClasses(element);
  element.classList.add(effectName);
};

const onFilterSliderChange = (filterName, type) => {
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectValue.value = unencoded[handle];
    imagePreview.style.filter = `${filterName}(${effectValue.value}${type})`;
  });
};

const showSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderBackground.classList.remove('hidden');
};

const hideSlider = () => {
  sliderElement.classList.add('hidden');
  sliderBackground.classList.add('hidden');
};

const resetSliderValues = () => {
  hideSlider();
  removeEffectClasses(imagePreview);
  imagePreview.style.filter = null;
};

const initializeSlider = () => {
  noUiSlider.create(sliderElement, sliderOptions);
  resetSliderValues();
};

const removeSlider = () => {
  sliderElement.noUiSlider.destroy();
};

const updateSliderOptions = (rangeMin, rangeMax, sliderStep, startValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: rangeMin,
      max: rangeMax,
    },
    step: sliderStep,
    start: startValue,
  });
};

const applyImageFilter = (image, filterObject) => {
  if (filterObject === effects.NONE) {
    resetSliderValues();
  } else {
    showSlider();
    addEffectClass(image, `effects__preview--${filterObject.name}`);
    updateSliderOptions(filterObject.sliderMinRange, filterObject.sliderMaxRange, filterObject.sliderStep, filterObject.sliderStart);
    onFilterSliderChange(filterObject.styleProperty, filterObject.stylePropertyValue);
  }
};

const filteringImage = (evt) => {
  switch (evt.target.value) {
    case effects.NONE.name:
      applyImageFilter(imagePreview, effects.NONE);
      break;
    case effects.CHROME.name:
      applyImageFilter(imagePreview, effects.CHROME);
      break;
    case effects.SEPIA.name:
      applyImageFilter(imagePreview, effects.SEPIA);
      break;
    case effects.MARVIN.name:
      applyImageFilter(imagePreview, effects.MARVIN);
      break;
    case effects.PHOBOS.name:
      applyImageFilter(imagePreview, effects.PHOBOS);
      break;
    case effects.HEAT.name:
      applyImageFilter(imagePreview, effects.HEAT);
      break;
  }
};

export { filteringImage, initializeSlider, removeSlider };
