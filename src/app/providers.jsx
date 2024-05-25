import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        {children}
      </main>
    </NextUIProvider>
  );
}
