
'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var me = {
  name: 'Лариса',
  color: 'rgba(255, 0, 0, 1)'
};

// Функция отрисовки облака и тени сообщения
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция вывода текста в облаке сообщения
var writeText = function (ctx, text, x, y, font) {
  ctx.font = font;
  ctx.fillText(ctx, text, x, y);
};

// Функция выбора максимального времени прохождения игры
var getMaxItem = function (array) {
var maxItem = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxItem) {
      maxItem = array[i] / BAR_HEIGHT;
  }
 }
  return maxItem;
};


window.renderStatistics = function (ctx, names, times) {

  // Тень от облака
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');

  // Белое облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Текст сообщения
  writeText(ctx, 'Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP, '16px PT Mono');
  writeText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 2, '16px PT Mono');

  // maxTime     = BAR_HEIGHT;
  // times[i]    =    X
  // X = times[i] * BAR_HEIGHT/maxTime

var maxTime = getMaxItem(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'rgba(28, 79, 175, '+ Math.random().toFixed(1) +')';
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + BAR_HEIGHT + GAP * 2, BAR_WIDTH, (times[i] * BAR_HEIGHT) / maxTime);
    ctx.fillText(names[i], CLOUD_X + GAP, 75);
 }
};


