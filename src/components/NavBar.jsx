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
import logo from "../../public/icons/GALogo.png";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Portfolio", "About Us", "Contact Us"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={logo} alt="Golden Age Logo" width={150} height={150} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="primary" href="porfolio">
            Portfolio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="primary" href="/about">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="primary" href="/contact">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="dark">
        <NavbarMenuItem>
          <Link color="primary" className="w-full" href="/portfolio" size="lg">
            Portfolio
          </Link>
          <Link color="primary" className="w-full" href="/about" size="lg">
            About Us
          </Link>
          <Link color="primary" className="w-full" href="/contact" size="lg">
            Contact Us
          </Link>
          <Link color="primary" className="w-full" href="/login" size="lg">
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
