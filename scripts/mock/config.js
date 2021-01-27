const Mock = require('mockjs');

const currencies = ['BTC', 'ETH', 'USDT', 'EOS', 'BCH', 'LTC', 'XRP', 'ETC', 'BSV', 'BUSDT', 'LUT'];

Mock.Random.extend({
  currencies,
  currency: function () {
    return this.pick(this.currencies);
  },
});

Mock.Random.extend({
  prizeTypes: ['CANCEL', 'AWARD', 'HALF_WIN', 'HALF_LOST', 'LOSE'],
  prizeType: function () {
    return this.pick(this.prizeTypes);
  },
});

module.exports = {
  currencies,
};
