import './globals.css';
import GoogleAnalytics from './lib/analytics';
import GoogleAnalyticsTracker from './lib/GoogleAnalyticsTracker';

export const metadata = {
  title: 'BloomShort',
  description: 'Flowery URL Shortener',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <GoogleAnalyticsTracker />
        {children}
      </body>
    </html>
  );
}