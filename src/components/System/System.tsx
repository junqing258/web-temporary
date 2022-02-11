import React from 'react';

import Spinner from './Spinner';

declare const __webpack_init_sharing__: any;
declare const __webpack_share_scopes__: any;

function loadComponent(scope: any, module: any) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope] as any; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
}

const cache: any = {};

const useDynamicScript = (args: any) => {
  const [ready, setReady] = React.useState<boolean>();
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    let element: HTMLScriptElement = document.querySelector(`script[src="${args.url}"]`) as HTMLScriptElement;

    const onReady = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      window.dispatchEvent(new CustomEvent('btg_system_load', { detail: 1 }));
      setReady(true);
    };

    if (element) {
      console.log(`Already Loaded`);
      setTimeout(onReady);
    } else if ((element = cache[args.url])) {
      console.log(`append from cache`);
      document.head.appendChild(element);
      setTimeout(onReady);
    } else {
      setReady(false);
      setFailed(false);
      window.dispatchEvent(new CustomEvent('btg_system_load', { detail: 0 }));

      element = document.createElement('script');
      element.src = args.url;
      element.type = 'text/javascript';
      element.async = true;

      element.onload = () => {
        onReady();
        cache[args.url] = element;
      };

      element.onerror = () => {
        console.error(`Dynamic Script Error: ${args.url}`);
        window.dispatchEvent(new CustomEvent('btg_system_load', { detail: -1 }));
        setReady(false);
        setFailed(true);
      };
      document.head.appendChild(element);
    }

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

type SystemPropsType = {
  url: string;
  scope: string;
  module: string;
};

function System(system: SystemPropsType) {
  const { ready, failed } = useDynamicScript({
    url: system && system.url,
  });

  if (ready === undefined) return null;

  if (ready === false) {
    console.log(`Loading dynamic script: ${system.url}`);
    return <Spinner />;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {system.url}</h2>;
  }

  const Component = React.lazy(loadComponent(system.scope, system.module));

  return (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}

export { System };
