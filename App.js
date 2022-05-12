import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeStackScreen from "./screens/Home";
import React, { useState, useEffect } from "react";
import Settings from "./screens/Settings";
import {
  useFonts,
  NewsCycle_400Regular,
  NewsCycle_700Bold,
} from "@expo-google-fonts/news-cycle";
import AppLoading from "expo-app-loading";

const Tab = createBottomTabNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    NewsCycle_400Regular,
    NewsCycle_700Bold,
  });
  let fontSize = 24;
  let paddingVertical = 6;
  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#cf5b72"
          barStyle={{ backgroundColor: "white" }}
          screenOptions={{
            activeTintColor: "rgb(250,91,90)",
            keyboardHidesTabBar: true,
            labelStyle: { alignSelf: "auto", marginBottom: 5 },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Feather name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
