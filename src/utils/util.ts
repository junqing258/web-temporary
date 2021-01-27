export function loadCss(href: string, cssId = 'myCss'): void {
  if (!document.getElementById(cssId)) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href; //'http://website.com/css/stylesheet.css';
    link.media = 'all';
    head.appendChild(link);
  }
}
