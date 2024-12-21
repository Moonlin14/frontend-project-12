import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';

import AuthProvider from './context/AuthProvider.jsx';
import { chatApiContext } from './context/context';
import App from './Components/App.jsx';
import store from './store/index.js';
import chatApi from './context/chatApi.js';
import resources from './locales/index.js';
import rollbarConfig from './rollbarConfig.js';

export default async () => {
  const i18n = i18next.createInstance();
  await i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
  });

  const filter = leoProfanity.getDictionary('ru')
  leoProfanity.add(filter)

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <chatApiContext.Provider value={chatApi}>
                <App />
              </chatApiContext.Provider>
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}