import "@/styles/app.css";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/plus-jakarta-sans";

import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { Toaster } from "./components/ui/sonner";
import { FileRoutes } from "@solidjs/start/router";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Suspense>
            {props.children}
            <Toaster />
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
