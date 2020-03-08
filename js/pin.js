'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var adPinList = document.querySelector('.map__pins');
  var adPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(ads, counter) {
    var offerPin = adPinTemplate.cloneNode(true);
    var adElementImage = offerPin.querySelector('img');
    var adCoordinateX = ads[counter].location.x - PIN_WIDTH / 2;
    var adCoordinateY = ads[counter].location.y - PIN_HEIGHT;
    offerPin.setAttribute('style', 'left:' + adCoordinateX + 'px; top:' + adCoordinateY + 'px;');
    adElementImage.setAttribute('src', ads[counter].author.avatar);
    adElementImage.setAttribute('alt', ads[counter].offer.title);

    offerPin.addEventListener('click', function () {
      window.insertAdCard(ads, counter);
    });
    return offerPin;
  }

  function renderAdPins(ads) {
    var templateList = document.createDocumentFragment();
    for (var i = ads.length - 1; i >= 0; --i) {
      if (ads[i].offer) {
        templateList.append(renderPin(ads, i));
      }
    }
    return templateList;
  }

  window.insertAdPins = function (ads) {
    adPinList.prepend(renderAdPins(ads));
  };
})();

