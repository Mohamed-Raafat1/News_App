// import createContext and useState
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

import * as Localization from "expo-localization";

import i18n from "i18n-js";
import en from "../translations/en";
import fr from "../translations/fr";
// Initiate context
const ThemeContext = createContext();
const initialValue = Appearance.getColorScheme();

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: en,
  fr: fr,
};
console.log(i18n.translations);

const ThemeProvider = ({ children }) => {
  // Manage theme state

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [language, setLanguage] = useState(Localization.locale.slice(0, 2));
  i18n.locale = language;
  useEffect(() => {
    AsyncStorage.getItem("theme").then((value) => {
      if (value) {
        setTheme(value);
      }
    });

    AsyncStorage.getItem("user-language").then((value) => {
      if (value) setLanguage(value);
    });
  }, []);
  useEffect(() => {
    AsyncStorage.setItem("user-language", language);
  }, [language]);
  useEffect(() => {
    AsyncStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
