import { Sacramento, Manrope } from 'next/font/google';
import '@/shared/css/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import StoreProvider from './StoreProvider';
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

export const metadata = {
  title: 'Zestful Amigos',
  description: 'Where you can find your partner or find a companion'
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${sacramento.variable} ${manrope.variable}`}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTKEY}
          >
            <NotificationManager>{children}</NotificationManager>
          </GoogleOAuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
