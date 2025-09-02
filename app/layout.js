import './globals.css';

export const metadata = {
  title: 'Admin Portal',
  description: 'Simple admin portal example',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
