/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ReactDOM from 'react-dom';
import { rehydrateMarks } from 'react-imported-component';
import App from './App';

// In production, we want to hydrate instead of render
// because of the server-rendering
if (window.___REACT_DEFERRED_COMPONENT_MARKS) {
  // rehydrate the bundle marks
  rehydrateMarks().then(() => {
    ReactDOM.hydrate(<App />, document.getElementById('root'));
  });
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}

/* function loadCss(href, cssId = 'myCss') {
  if (!document.getElementById(cssId)) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href; //'http://website.com/css/stylesheet.css';
    head.appendChild(link);
  }
}
const render = (props = {}) => {
  const { container } = props;
  ReactDOM.render(<App />, container || document.querySelector('#root'));
};

if (!window.singleSpaNavigate) {
  render();
} else {
  // basename={window.__POWERED_BY_QIANKUN__ ? '/app2' : '/'}

  window.baseUrl = '/activity';
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH__ || '/';

  loadCss(`${__webpack_public_path__}css/main.css`, 'mainCss');
}

export async function bootstrap(props) {
  console.log('h5-wing bootstrap', props);
}

export async function mount(props) {
  console.log('h5-wing mount', props);
  render(props);
}

export async function unmount(props) {
  console.log('h5-wing unmount', props);
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
  document.getElementById('mainCss')?.remove();
}
*/
