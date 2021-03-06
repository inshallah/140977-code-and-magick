
'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

// Функция отрисовки облака и тени сообщения
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция вывода текста в облаке сообщения
var writeText = function (ctx, text, x, y, font) {
  ctx.fillStyle = '#000';
  ctx.font = font;
  ctx.fillText(text, x, y);
};

// Функция выбора максимального времени прохождения игры
var getMaxItem = function (array) {
  var maxItem = array[0];

  for (var i = 1; i <= array.length; i++) {
    if (array[i] > maxItem) {
      maxItem = array[i];
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
  writeText(ctx, 'Ура вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + GAP * 2, '16px PT Mono');
  writeText(ctx, 'Список результатов:', CLOUD_X + BAR_GAP, CLOUD_Y + GAP * 4, '16px PT Mono');

  // maxTime     = BAR_HEIGHT;
  // times[i]    =    X
  // X = times[i] * BAR_HEIGHT/maxTime

  var maxTime = getMaxItem(times);


  for (var i = 0; i < names.length; i++) {
    var forXrect = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var trueHeight = (times[i] * BAR_HEIGHT) / maxTime;
    var forYrect = CLOUD_HEIGHT - trueHeight - GAP * 2;
    var forYtext = CLOUD_HEIGHT - GAP / 2;
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(28, 79, 175, ' + Math.random().toFixed(1) + ')';
    ctx.fillRect(forXrect, forYrect, BAR_WIDTH, trueHeight);
    ctx.fillText(names[i], forXrect, 75);
    ctx.fillText(Math.floor(times[i]), forXrect, forYtext);
  }
};

