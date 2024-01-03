import type { Metadata } from 'next';
import RecoilContextProvider from '@/src/app/_recoil/recoilContextProvider';
import './globals.css';
import METADATA from '@/src/app/_constant/Meta';

export const metadata: Metadata = {
  metadataBase: new URL('https://taskify3.vercel.app/'),
  title: METADATA.TITLE,
  description: METADATA.DESCRIPTION,
  openGraph: {
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    url: METADATA.URL,
    siteName: METADATA.TITLE,
    images: [
      {
        url: METADATA.IMAGE,
        width: 388,
        height: 388,
      },
    ],
    locale: METADATA.LOCALE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA.TITLE,
    description: METADATA.DESCRIPTION,
    site: METADATA.URL,
    images: [METADATA.IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <link rel='icon' href={METADATA.ICON} sizes='any' />
      </head>
      <body className='font-pre text-black'>
        <RecoilContextProvider>
          {children}
          <div id='modal' />
        </RecoilContextProvider>
      </body>
    </html>
  );
}
