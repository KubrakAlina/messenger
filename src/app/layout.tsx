import React from 'react';
import s from "./layout.module.scss";
import { MessengerProvider } from '@/context/MessengerContext';

interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <html>
      <body className={s.page}>
        <main>
          <MessengerProvider>
            {children}
          </MessengerProvider>
        </main>
      </body>
    </html>
  );
}

export default DefaultLayout;
