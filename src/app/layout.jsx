import { Sacramento, Manrope } from 'next/font/google';
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import StoreProvider from './StoreProvider';

const manrope = Manrope({
  weight: ['400', '600'], 
  subsets: ['latin'],
  variable: '--font-manrope',
});

const sacramento = Sacramento({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-Sacramento',
});

export const metadata = {
  title: "zestful amigos",
  description: "Generated by sahwaz yaser",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
    <html lang="en">
      <body
        className={`${sacramento.variable} ${manrope.variable}`}
      >
        <GoogleOAuthProvider clientId="224317892665-p9offtd3il7ll89u0bki3jbl184nimre.apps.googleusercontent.com">
        {children}
        </GoogleOAuthProvider>
      </body>
    </html>
    </StoreProvider>
  );
}
