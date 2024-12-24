import React from "react";
import AppRoutes from "./routes/AppRoutes";

import { Toaster } from "@/components/ui/sonner"

const App = () => (
  <>
    <AppRoutes />
    <Toaster className="max-sm:max-w-[350px]" richColors position="bottom-right" />
  </>
);

export default App;
