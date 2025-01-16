import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/index';
import App from './App';

const init = async () => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };
  await i18n.use(initReactI18next).init(options);
  const rollbarConfig = {
    accessToken: '1da3037a54d44f03a66acfeab2bf3f0c',
    environment: 'production',
  };
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
