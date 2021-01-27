// const open = require('open');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function getHex(file) {
  const s = fs.ReadStream(file);
  const shasum = crypto.createHash('md5');
  s.on('data', function (d) {
    shasum.update(d);
  });
  s.on('end', function () {
    var d = shasum.digest('hex');
    console.log(d);
  });
}

(async () => {
  // Opens the url in the default browser

  var localesHash = getHex(path.join(__dirname, '../public/locales'));
  console.log('localesHash', localesHash);
})();
