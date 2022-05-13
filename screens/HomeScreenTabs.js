import { Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useContext } from "react";
import { ThemeContext } from "../context-store/context";
import HomeStackScreen from "./Home";
import Settings from "./Settings";

const HomeTabs = createBottomTabNavigator();
const HomeScreenTabs = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const linking = {
    prefixes: [Linking.createURL("/")],

    config: {
      screens: {
        Home: {
          screens: {
            NewsDetails: {
              path: "newsdetails/:id",
              parse: {
                id: (id) => `user-${idr}`,
              },
            },
          },
        },
        Settings: "settings",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <HomeTabs.Navigator
        activeColor="#6a0dad"
        screenOptions={{
          keyboardHidesTabBar: true,
          tabBarStyle: {
            backgroundColor: theme === "light" ? "white" : "black",
          },
          labelStyle: { alignSelf: "auto", marginBottom: 5 },
        }}
      >
        <HomeTabs.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabelStyle: { fontWeight: "bold" },
            tabBarActiveTintColor: theme === "light" ? "#4287f5" : "#4287f5",
            tabBarInactiveTintColor: theme === "light" ? "gray" : "gray",
            headerShown: false,
            tabBarLabel: "HOME",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <HomeTabs.Screen
          name="Settings"
          component={Settings}
          options={{
            headerStyle: {
              backgroundColor: theme === "light" ? "white" : "black",
            },
            headerTitleStyle: { color: theme === "light" ? "black" : "white" },

            tabBarLabelStyle: {
              fontWeight: "bold",
            },
            tabBarActiveTintColor: theme === "light" ? "#4287f5" : "#4287f5",
            tabBarInactiveTintColor: theme === "light" ? "gray" : "gray",

            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </HomeTabs.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreenTabs;
