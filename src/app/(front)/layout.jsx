import "@/app/globals.css";
import Providers from "@/app/providers";
import NavBar from "@/components/front/globals/NavBar";
import Footer from "@/components/front/globals/Footer";

export const metadata = {
  title: "Index Page",
  description: "Created by Nevec",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
      <Providers>
          <NavBar/>
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
