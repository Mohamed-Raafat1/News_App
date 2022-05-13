import React, { useState, useEffect, useContext } from "react";

import { ThemeProvider } from "./context-store/context";
import { View } from "react-native";

import HomeScreenTabs from "./screens/HomeScreenTabs";

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreenTabs></HomeScreenTabs>
    </ThemeProvider>
  );
}
