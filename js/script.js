var app = {
  init: function() {
    var self = this;
    var $rate = $('h1');

    self.getRate($rate);

    setInterval(function() {
      self.getRate($rate);
    }, 60 * 1000);
  },
  getRate: function($el) {
    $.getJSON('https://blockchain.info/ticker?cors=true', function(data) {
      var rate = data.EUR.last,
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
  
      document.title = rate + ' ' + data.EUR.symbol + suffix;
      $el.text(rate);
    });
  }
};

$(document).ready(function() {
  app.init();
});

