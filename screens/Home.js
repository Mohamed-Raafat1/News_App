import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsDetails from "./NewsDetails";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("NewsDetails");
      }}
    >
      <Text> my ass</Text>
    </TouchableOpacity>
  );
};
const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true, title: "Home" }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
