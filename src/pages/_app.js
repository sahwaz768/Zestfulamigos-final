import { Sacramento, Manrope } from 'next/font/google';
import '@/shared/css/globals.css';
import StoreProvider from '@/app/StoreProvider';
import NotificationManager from '@/components/NotificationManager';

const manrope = Manrope({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-manrope'
});

const sacramento = Sacramento({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-Sacramento'
});

function PagesApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <main className={`${sacramento.variable} ${manrope.variable}`}>
        <NotificationManager />
        <Component {...pageProps} />
      </main>
    </StoreProvider>
  );
}

export default PagesApp;
