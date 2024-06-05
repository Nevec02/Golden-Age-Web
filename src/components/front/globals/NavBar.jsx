"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image src="/icons/GALogo.png" priority alt="Golden Age Logo" width="150" height="150" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="primary" href="/portfolio">
            Portfolio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="primary" href="/about">
            Sobre nosotros
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="primary" href="/contact">
            Contacto
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Registro
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="dark">
        <NavbarMenuItem>
          <Link color="primary" className="w-full" href="/portfolio" size="lg">
            Portfolio
          </Link>
          <Link color="primary" className="w-full" href="/about" size="lg">
            Sobre nosotros
          </Link>
          <Link color="primary" className="w-full" href="/contact" size="lg">
            Contacto
          </Link>
          <Link color="primary" className="w-full" href="/login" size="lg">
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
