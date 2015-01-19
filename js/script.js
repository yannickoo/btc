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
    $.ajax({
      url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Fblockchain.info/ticker%27%0A&format=json&callback=?',
      dataType: 'jsonp',
      success: function(data) {
        var json = $.parseJSON(data.query.results.body.p),
            rate = data.EUR.last,
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
      }
    });
  }
};

$(document).ready(function() {
  app.init();
});

