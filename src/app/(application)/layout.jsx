import "@/app/globals.css";
export const metadata = {
  title: "Dashboard Page",
  description: "Created by Nevec",
};

export default function DashboardLayout({ children }) {
  return (
    <section>
      <h2>Dashboard Layout</h2>
      {children}
    </section>
  );
}
