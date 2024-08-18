export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dze2nzm.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@34,400,1,0" />
        <meta name="robots" content="none" />
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
