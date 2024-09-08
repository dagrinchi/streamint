import localFont from 'next/font/local';
import './globals.css';

const blinkMacSystemFontBlack = localFont({
  src: "./fonts/BlinkMacSystemFont-Black.woff",
  variable: "--font-blinkmacsystemfont-black",
  weight: "700 900",
});
const helveticaNeue = localFont({
  src: "./fonts/HelveticaNeue.woff",
  variable: "--font-helveticaneue",
  weight: "100 900",
});

export const metadata = {
  title: "Streamint",
  description: "Descentralized video platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${helveticaNeue.variable} ${blinkMacSystemFontBlack.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
