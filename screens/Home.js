import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsDetails from "./NewsDetails";
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import newAPI from "../apis/News";
import News from "../apis/News";
import { Divider } from "react-native-paper";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [Loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNewsFromAPI();
  }, []);
  function getNewsFromAPI() {
    newAPI
      .get("top-headlines?country=us&apiKey=0d4c4729aa7f415d8c6ea5ddb3382d64")
      .then(async function (response) {
        setNews(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }
  console.log(news.length);
  if (!news) return <Text> fuck</Text>;

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {news.map((object, index) => (
        <View>
          <NewsCard key={index} navigation={navigation} news={object} />
        </View>
      ))}
    </ScrollView>
  );
};
const HomeStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true, title: "Home" }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ title: "Details" }}
        name="NewsDetails"
        component={NewsDetails}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
