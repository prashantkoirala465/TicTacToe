import './locales/i18n';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import App from 'App';
import 'antd/dist/reset.css';
import { Buffer as B } from 'buffer';
import FontFaceObserver from 'fontfaceobserver';
import { configureAppStore } from 'store/configureStore';
import { ThemeProvider } from 'theme/ThemeProvider';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Titillium Web', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
});
if (!window.Buffer) {
    window.Buffer = B;
}
const store = configureAppStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <HelmetProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </HelmetProvider>
        </ThemeProvider>
    </Provider>,
);
