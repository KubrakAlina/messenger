import React from 'react';
import s from "./layout.module.scss";

interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <html>
      <body className={s.page}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

export default DefaultLayout;
