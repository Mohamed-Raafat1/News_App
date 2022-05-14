import React from "react";
import { ThemeProvider } from "./context-store/context";
import HomeScreenTabs from "./screens/HomeScreenTabs";

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreenTabs></HomeScreenTabs>
    </ThemeProvider>
  );
}
