import "./globals.css";

export const metadata = {
  title: "Index Page",
  description: "Created by Nevec",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
