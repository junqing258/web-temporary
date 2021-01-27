/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const etag = require('etag');
const cheerio = require('cheerio');
const React = require('react');
const { Helmet } = require('react-helmet');
const { printDrainHydrateMarks, drainHydrateMarks } = require('react-imported-component');

React.useLayoutEffect = React.useEffect;
process.env.RENDER_ENV = 'server';

const { render } = require('../dist/ssr/main');
// const { render } = require('../src/ssr.tsx');

const app = express();
const port = 8080;

app.use(
  helmet({
    contentSecurityPolicy: false /* {
      directives: {
        'default-src': ["'self'"],
        'frame-src': ["'self'"],
        'style-src': ["'self'", 'https://cdnjs.cloudflare.com', 'https://unpkg.com', 'fonts.googleapis.com'],
        'script-src': ["'self'", 'https://cdnjs.cloudflare.com', 'https://unpkg.com'],
        'object-src': ["'none'"],
      },
    }, */,
  }),
);
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port, () => console.log(`App listening on port ${port}!`));

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
    HTML_TEMPLATE = fs.readFileSync(path.join(__dirname, '../dist/views/index.html'), { encoding: 'utf8', flag: 'r' });
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
