const http = require('http');
const sockjs = require('sockjs');
const StompJs = require('@stomp/stompjs');
const StompServer = require('stomp-broker-js');

// var client = Stomp.overWS('ws://localhost:61614/stomp');

const server = sockjs.createServer({ prefix: '/bitgame2' });
const stompServer = new StompServer({ server: server });

server.listen(8443);

stompServer.subscribe('/**', function (msg, headers) {
  var topic = headers.destination;
  // console.log(topic, '->', msg);
});

stompServer.send('/test', {}, 'testMsg');
