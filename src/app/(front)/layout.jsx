import "@/app/globals.css";

export const metadata = {
  title: "Index Page",
  description: "Created by Nevec",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <h2>Root Layout</h2>
        {children}
      </body>
    </html>
  );
}
