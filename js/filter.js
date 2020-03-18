'use strict';

(function () {
  var MAX_ADS_COUNT = 5;
  var DEBOUNCE_INTERVAL = 500;
  var form = document.querySelector('.map__filters');
  var formSelects = form.querySelectorAll('select');
  var featuresFieldset = form.querySelector('#housing-features');
  var features = featuresFieldset.querySelectorAll('input');
  var lastTimeout;

  var filterList = {
    'housing-type': {
      status: false,
      value: undefined,
      key: 'type',
      condition: checkByEquality,
      callback: filterByValue
    },
    'housing-price': {
      status: false,
      value: undefined,
      key: 'price',
      condition: checkByPriceRange,
      callback: filterByValue
    },
    'housing-rooms': {
      status: false,
      value: undefined,
      key: 'rooms',
      condition: checkByEquality,
      callback: filterByValue
    },
    'housing-guests': {
      status: false,
      value: undefined,
      key: 'guests',
      condition: checkByEquality,
      callback: filterByValue
    },
    'housing-features': {
      status: false,
      value: [],
      key: 'features',
      condition: checkByList,
      callback: filterByValue
    },
  };

  var priceRangeMap = {
    'low': [0, 10000],
    'middle': [10000, 50000],
    'high': [50000, Infinity]
  };

  function debounce(callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  }

  function conversionType(first, second) {
    var type = typeof first;
    switch (type) {
      case 'number':
        second = Number(second);
        return second;
      case 'string':
        second = String(second);
        return second;
      default:
        return second;
    }
  }

  function trimByMaxCount(ads) {
    var filteredAds = [];
    for (var i = 0; i < 5 && i < ads.length; i++) {
      filteredAds.push(ads[i]);
    }
    return filteredAds;
  }

  function checkByEquality(first, second) {
    second = conversionType(first, second);
    return first === second;
  }

  function checkByPriceRange(rangeValue, price) {
    var range = priceRangeMap[rangeValue];
    return (range[0] <= price && range[1] > price);
  }

  function checkByList(list, targetList) {
    var difference = list.filter(function (item) {
      return !targetList.includes(item);
    });
    return !difference.length;
  }

  function filterByValue(value, key, ads, condition) {
    var filteredAds = [];
    for (var i = 0; i < ads.length && filteredAds.length < MAX_ADS_COUNT; i++) {
      if (condition(value, ads[i].offer[key])) {
        filteredAds.push(ads[i]);
      }
    }
    return filteredAds;
  }

  function setFilterStatus(evt) {
    var input = evt.target;
    var value = input.value;
    switch (value) {
      case 'any':
        filterList[input.name].status = false;
        filterList[input.name].value = value;
        insertFilteredPins();
        break;
      default:
        filterList[input.name].status = true;
        filterList[input.name].value = value;
        insertFilteredPins();
        break;
    }
  }

  function setFilterListStatus(evt) {
    var fieldset = evt.currentTarget;
    filterList[fieldset.id].status = false;
    filterList[fieldset.id].value = [];
    var inputList = fieldset.querySelectorAll('input');
    inputList.forEach(function (input) {
      if (input.checked) {
        filterList[fieldset.id].status = true;
        filterList[fieldset.id].value.push(input.value);
      }
    });
    insertFilteredPins();
  }

  function insertFilteredPins() {
    var ads = window.ads;
    var filters = Object.values(filterList);
    filters.forEach(function (item) {
      if (item.status) {
        ads = item.callback(item.value, item.key, ads, item.condition);
      }
    });

    function insert() {
      window.pin.insert(trimByMaxCount(ads));
    }

    debounce(insert);
  }

  formSelects.forEach(function (select) {
    select.addEventListener('input', setFilterStatus);
  });
  featuresFieldset.addEventListener('input', setFilterListStatus);
  window.handler.checkboxesFieldset(features);

  window.filter = {
    trim: trimByMaxCount
  };
})();
