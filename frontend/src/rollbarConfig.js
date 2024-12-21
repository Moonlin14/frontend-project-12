export default {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
}