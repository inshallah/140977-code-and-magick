'use strict';


// ПРОГРАММА ДЛЯ СОЗДАНИЯ ПОХОЖИХ ВОЛШЕБНИКОВ

var userDialogElement = document.querySelector('.setup');
userDialogElement.classList.remove('hidden');

var similarListElement = userDialogElement.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];


var getRandomInt = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

// Функция создания объекта

var getWizard = function () {
  return {
    name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length - 1)],
    coatColor: WIZARD_COATCOLOR[getRandomInt(0, WIZARD_COATCOLOR.length - 1)],
    eyesColor: WIZARD_EYESCOLOR[getRandomInt(0, WIZARD_EYESCOLOR.length - 1)]
  };
};


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard['name'];
  wizardElement.querySelector('.wizard-coat').style.fill = wizard['coatColor'];
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard['eyesColor'];

  return wizardElement;
};

var generateWizard = function () {
  for (var i = 0; i < 4; i++) {
    wizards.push(getWizard());
  }
};

generateWizard();

var render = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

};

render();


// ОБРАБОТЧИКИ СОБЫТИЙ
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var buttonSave = setup.querySelector('.setup-submit');

// Если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы
buttonSave.addEventListener('click', function () {
  var form = setup.querySelector('.setup-wizard-form').action = 'https://js.dump.academy/code-and-magick';
  form.submit();
});

// Если диалог открыт и фокус находится на кнопке «Сохранить», нажатие на ENTER приводит к отправке формы
buttonSave.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var form = setup.querySelector('.setup-wizard-form');
    form.action = 'https://js.dump.academy/code-and-magick';
    form.submit();
  }
});

var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Изменение цвета мантии и цвета глаз персонажа по нажатию
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoatColor = setup.querySelector('input[name = "coat-color"]');
// var wizardEyesColor = setup.querySelector('input[name = "eyes-color"]');
setupWizard.addEventListener('click', function () {
  setup.querySelector('.wizard-coat').style.fill = COAT_COLOR[getRandomInt(0, COAT_COLOR.length - 1)];
  setup.querySelector('.wizard-eyes').style.fill = EYES_COLOR[getRandomInt(0, EYES_COLOR.length - 1)];
  // var coatColor = setup.querySelector('.wizard-coat');
  // coatColor.style.fill = COAT_COLOR[getRandomInt(0, COAT_COLOR.length - 1)];
  wizardCoatColor.input.value = COAT_COLOR[getRandomInt(0, COAT_COLOR.length - 1)];
});


// Изменение цвета фаерболов по нажатию
var fireballSetup = setup.querySelector('.setup-fireball-wrap');
fireballSetup.addEventListener('click', function () {
  fireballSetup.style.background = FIREBALL_COLOR[getRandomInt(0, FIREBALL_COLOR.length - 1)];
});

