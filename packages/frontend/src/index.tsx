import ChartJS from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import App from './App';
import './assets/tailwind.css';
import { SEO } from './components/seo/seo';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { isUpdateAllowed } from './utils/allowedUpdateLocations';

ChartJS.register(zoomPlugin);

const Root = (): JSX.Element => {
  const { pathname } = useLocation();
  const [isAppUpdateAvailable, setIsAppUpdateAvailable] = useState(false);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        const waitingServiceWorker = registration.waiting;

        if (waitingServiceWorker) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          waitingServiceWorker.addEventListener(
            'statechange',
            (event: Event) => {
              if ((event.target as ServiceWorker).state === 'activated') {
                setIsAppUpdateAvailable(true);
              }
            }
          );
          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      },
    });
  }, []);

  useEffect(() => {
    if (isAppUpdateAvailable && isUpdateAllowed(pathname)) {
      window.location.reload();
    }
  }, [isAppUpdateAvailable, pathname]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <SEO />
        <App />
      </Provider>
    </React.StrictMode>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Router>
    <Root />
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
