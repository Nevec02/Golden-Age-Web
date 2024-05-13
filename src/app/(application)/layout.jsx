import "@/app/globals.css";
export const metadata = {
  title: "Dashboard Page",
  description: "Created by Nevec",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <h2>Dashboard Layout</h2>
        {children}
      </body>
    </html>
  );
}
