import { Sacramento, Manrope } from 'next/font/google';
import '@/shared/css/globals.css';

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
    <main className={`${sacramento.variable} ${manrope.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default PagesApp;
