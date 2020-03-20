'use strict';

(function () {
  var DEFAULT_AVATAR = 'img/avatars/default.png';

  var StringTemplate = {
    PRICE: '{{price}} ₽/ночь',
    TIME: 'Заезд после {{checkin}}, выезд до {{checkout}}',
    CAPACITY: '{{rooms}} для {{guests}}',
  };

  var Declaration = {
    GUESTS: ['гостя', 'гостей', 'гостей'],
    ROOMS: ['комната', 'комнаты', 'комнат']
  };

  var OfferType = {
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'flat': 'Квартира',
    'palace': 'Дворец'
  };

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');
  var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var adPinList = document.querySelector('.map__pins');

  function getDeclaration(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    var index = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
    return number + ' ' + titles[index];
  }

  function closeCurrentPopup() {
    var currentOpenCard = map.querySelector('.map__card.popup');
    if (currentOpenCard) {
      currentOpenCard.remove();
    }
  }

  function deselectPin() {
    var selectedPin = adPinList.querySelector('.map__pin--active');
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
  }

  function renderAdCard(ad) {
    var offer = ad.offer;
    var card = adCardTemplate.cloneNode(true);
    var offerAvatar = card.querySelector('.popup__avatar');
    var offerFeatures = card.querySelector('.popup__features');
    var defaultPhoto = card.querySelector('.popup__photos .popup__photo');
    var cardClose = card.querySelector('.popup__close');
    var featuresCollection = document.createDocumentFragment();
    var photosCollection = document.createDocumentFragment();
    var priceString = offer.price ? StringTemplate.PRICE.replace('{{price}}', offer.price) : '';
    var timingString = (offer.checkout && offer.checkin) ? StringTemplate.TIME.replace('{{checkout}}', offer.checkout).replace('{{checkin}}', offer.checkin) : '';
    var capacityString = StringTemplate.CAPACITY.replace('{{rooms}}', getDeclaration(offer.rooms, Declaration.ROOMS)).replace('{{guests}}', getDeclaration(offer.guests, Declaration.GUESTS));

    capacityString = (offer.rooms && offer.guests) ? capacityString : '';
    offerAvatar.src = ad.author.avatar ? ad.author.avatar : DEFAULT_AVATAR;
    defaultPhoto.remove();
    offerFeatures.innerHTML = '';

    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__type').textContent = OfferType[offer.type];
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__description').textContent = offer.description;
    card.querySelector('.popup__text--price').textContent = priceString;
    card.querySelector('.popup__text--capacity').textContent = capacityString;
    card.querySelector('.popup__text--time').textContent = timingString;

    offer.features.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + feature;
      featuresCollection.append(featureElement);
    });
    offerFeatures.append(featuresCollection);

    offer.photos.forEach(function (src) {
      var img = defaultPhoto.cloneNode(false);
      img.src = src;
      photosCollection.prepend(img);
    });
    card.querySelector('.popup__photos').append(photosCollection);

    window.handler.popup(cardClose, true, deselectPin);
    return card;
  }

  window.card = {
    insertAdCard: function (ads, offerId) {
      deselectPin();
      closeCurrentPopup();
      map.insertBefore(renderAdCard(ads, offerId), mapFilter);
    }
  };
})();

