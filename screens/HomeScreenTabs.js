import { Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import i18n from "i18n-js";
import { useContext } from "react";
import { ThemeContext } from "../context-store/context";
import HomeStackScreen from "./Home";
import Settings from "./Settings";
import { Text } from "react-native";

//Configuring linking object to handle incoming links
export const linking = {
  prefixes: [Linking.createURL("/"), "newsapp://"],
  config: {
    initialRouteName: "Home",

    screens: {
      Home: {
        screens: {
          Home: "home",
          NewsDetails: { path: "newsdetails/:id?" },
        },
      },
      Settings: "settings",
    },
  },
};

const HomeTabs = createBottomTabNavigator();
//main component to be put in App.js
const HomeScreenTabs = ({ navigation }) => {
  //theme const for darkmode
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer linking={linking}>
      <HomeTabs.Navigator
        activeColor="#6a0dad"
        screenOptions={{
          keyboardHidesTabBar: true,

          tabBarStyle: {
            backgroundColor: theme === "light" ? "white" : "black",
            elevation: 0,
            shadowOpacity: 0,

            paddingTop: 5,

            borderColor: "black",
          },
          labelStyle: { alignSelf: "auto", marginBottom: 5 },
        }}
      >
        <HomeTabs.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabelStyle: { fontWeight: "bold" },
            tabBarActiveTintColor: theme === "light" ? "black" : "white",
            tabBarInactiveTintColor: theme === "light" ? "gray" : "gray",

            headerShown: false,
            tabBarLabel: i18n.t("navigation.Home"),
            tabBarIcon: ({ color, size, focused }) =>
              focused === true ? (
                <Ionicons name="home" size={size} color={color} />
              ) : (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
          }}
        />
        <HomeTabs.Screen
          name="Settings"
          component={Settings}
          options={{
            title: i18n.t("navigation.Settings"),
            headerStyle: {
              backgroundColor: theme === "light" ? "white" : "black",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitleStyle: { color: theme === "light" ? "black" : "white" },

            tabBarLabelStyle: { fontWeight: "bold" },
            tabBarActiveTintColor: theme === "light" ? "black" : "white",
            tabBarInactiveTintColor: theme === "light" ? "gray" : "gray",

            tabBarLabel: i18n.t("navigation.Settings"),
            tabBarIcon: ({ color, size, focused }) =>
              focused === true ? (
                <Ionicons name="md-settings" size={size} color={color} />
              ) : (
                <Ionicons
                  name="md-settings-outline"
                  size={size}
                  color={color}
                />
              ),
          }}
        />
      </HomeTabs.Navigator>
    </NavigationContainer>
  );
};
export default HomeScreenTabs;
