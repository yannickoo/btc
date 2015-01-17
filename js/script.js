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
    $.getJSON('http://blockchain.info/ticker?cors=true', function(data) {
      var rate = data.EUR.last;

      document.title = rate + ' ' + data.EUR.symbol;
      $el.text(rate);
    });
  }
}

$(document).ready(function() {
  app.init();
});

