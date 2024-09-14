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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
        <meta name="robots" content="none" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${biorhyme.variable} ${radioCanada.variable}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
