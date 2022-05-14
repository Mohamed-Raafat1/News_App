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

// key value pairs for french&english
i18n.translations = {
  en: en,
  fr: fr,
};

const ThemeProvider = ({ children }) => {
  // Manage theme state & language

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [language, setLanguage] = useState(Localization.locale.slice(0, 2));
  i18n.locale = language;
  useEffect(() => {
    //get cached value of theme
    AsyncStorage.getItem("theme").then((value) => {
      //if there is cached value use value
      //if there is no value. it's initialized with device local language
      if (value) {
        setTheme(value);
      }
    });
    //get cached value for language
    AsyncStorage.getItem("user-language").then((value) => {
      if (value) setLanguage(value);
    });
  }, []);
  //if language changes cache the value
  useEffect(() => {
    AsyncStorage.setItem("user-language", language);
  }, [language]);
  //if theme changes cache the value
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
