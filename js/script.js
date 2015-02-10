var app = {
  init: function() {
    var self = this;
    var $rate = $('h1');
    var currency = self.getCurrency() || 'EUR';

    self.getRate(currency, $rate);

    setInterval(function() {
      self.getRate(currency, $rate);
    }, 60 * 1000);
  },
  getRate: function(currency, $el) {
    $.getJSON('https://blockchain.info/ticker?cors=true', function(data) {
      var rate = data[currency].last,
          symbol = data[currency].symbol,
          oldRate = parseFloat($el.text()),
          suffix = '';

      if (rate > oldRate) {
        suffix = '➚';
      }
      else if (rate < oldRate) {
        suffix = '➘';
      }

      if (suffix) {
        suffix = ' ' + suffix;
      }

      document.title = rate + ' ' + symbol + suffix;
      $el.attr('data-symbol', symbol).text(rate);
    });
  },
  getCurrency: function () {
    var vars = window.location.search.substr(1).split('&');

    for (var i = 0, l = vars.length; i < l; i++) {
      var parts = vars[i].split('=');
      if (decodeURIComponent(parts[0]) === 'currency') {
        return decodeURIComponent(parts[1] || '');
      }
    }
  }
};

$(document).ready(function() {
  app.init();
});

