import { BioRhyme, Radio_Canada } from 'next/font/google'

const biorhyme = BioRhyme({ 
  subsets: ['latin'],
  variable: '--biorhyme'
})
const radioCanada = Radio_Canada({
  weight: '400', // Ensure this weight is available
  style: 'normal', // Ensure this style is available
  subsets: ['latin'],
  variable: '--radioCanada'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dze2nzm.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@34,400,1,0&display=swap" />
        <meta name="robots" content="none" />
      </head>
      <body className={`${biorhyme.variable} ${radioCanada.variable}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
