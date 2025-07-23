import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;