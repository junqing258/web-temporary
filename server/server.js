/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const etag = require('etag');
const favicon = require('serve-favicon');
const cheerio = require('cheerio');
const React = require('react');
const { Helmet } = require('react-helmet');
const { printDrainHydrateMarks, drainHydrateMarks } = require('react-imported-component');

React.useLayoutEffect = React.useEffect;
process.env.RENDER_ENV = 'server';

const { render } = require('../dist/server/ssr');
// const { render } = require('../src/ssr.tsx');

const app = express();
const port = 8080;

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(favicon(path.join(__dirname, '../dist/favicon.ico')));
app.get(/^\/(js|css|assets|(\d+|\.)|locales)\/(v.+?\/)?(.+$)/, express.static(path.join(__dirname, '../dist')));

app.listen(port, () => console.log(`App listening on port ${port}!`));

/* app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
}); */

let HTML_TEMPLATE = '',
  tag = etag(String(Date.now()));
app.get('/*', (req, res) => {
  if (req.headers['if-none-match'] === tag) {
    res.writeHead(304, 'Not Modified');
    res.end();
  } else {
    res.setHeader('ETag', tag);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(generateHtml(render(req), {}));
  }
});

export function generateHtml(markup, state) {
  if (!HTML_TEMPLATE) {
    HTML_TEMPLATE = fs.readFileSync(path.join(__dirname, '../dist/index.html'), { encoding: 'utf8', flag: 'r' });
    tag = etag(HTML_TEMPLATE);
  }
  const helmet = Helmet.renderStatic();
  const $template = cheerio.load(HTML_TEMPLATE);
  $template('head').append(helmet.title.toString() + helmet.meta.toString() + helmet.link.toString());
  $template('head').append(
    `<script type="text/javascript">window.__PRELOADED_STATE__ = ${JSON.stringify(state)};</script>`,
  );
  $template('head').append(printDrainHydrateMarks());
  $template('#root').html(markup);
  return $template.html();
}
