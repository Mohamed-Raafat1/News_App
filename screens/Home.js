import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import i18n from "i18n-js";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import newAPI from "../apis/News";
import NewsCard from "../components/NewsCard";
import { ThemeContext } from "../context-store/context";
import NewsDetails from "./NewsDetails";

const Stack = createNativeStackNavigator();
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  //consts
  const [keyWord, setkeyWord] = useState("");
  const [news, setNews] = useState([]);
  const { theme, setTheme, language } = useContext(ThemeContext);
  const [Refreshing, setRefreshing] = useState(false);
  const [Loading, setLoading] = useState(true);
  //Pull to refresh function

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getNewsFromAPI();
    setRefreshing(false);
  }, []);

  //get news from newsapi.org based on keyword
  //generic news provided if there is no keyword
  function getNewsFromAPI(keyWords = "world") {
    newAPI
      .get(
        "everything?q=" +
          keyWords +
          "&language=" +
          language +
          "&apiKey=87eac6de1c49426fada443bc1687e911"
      )
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

  //update news on language change
  useEffect(() => {
    getNewsFromAPI();
  }, [language]);
  //get news on component mount
  useEffect(() => {
    getNewsFromAPI();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: theme === "light" ? "white" : "black" }}
      refreshControl={
        <RefreshControl
          tintColor={theme === "light" ? "black" : "white"}
          refreshing={Refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Searchbar
        placeholder="Input keyword here"
        value={keyWord}
        onChangeText={(newText) => {
          setkeyWord(newText);
        }}
        //update news based on new keyword
        onSubmitEditing={() => {
          getNewsFromAPI(keyWord);
        }}
        onIconPress={() => {
          getNewsFromAPI(keyWord);
        }}
      ></Searchbar>
      {/* map each news article to a news card component */}
      {news.length > 0 &&
        news.map((object, index) => (
          <View>
            <NewsCard
              key={index + object.urlToImage}
              navigation={navigation}
              news={{ ...object, keyWord, language }}
            />
          </View>
        ))}
    </ScrollView>
  );
};
const HomeStackScreen = ({ navigation }) => {
  //theme const for darkmode
  const { theme } = useContext(ThemeContext);
  //creating the stack, Home-->Details
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,

          title: i18n.t("navigation.Home"),
          headerTitleStyle: {
            color: theme === "light" ? "black" : "white",
          },
          headerStyle: {
            backgroundColor: theme === "light" ? "white" : "black",
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("navigation.Details"),

          headerTitleStyle: {
            color: theme === "light" ? "black" : "white",
          },

          headerStyle: {
            //Remove the top border for header
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: theme === "light" ? "white" : "black",
          },
          //Add the same back button for both platforms
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
            >
              <Ionicons
                name="arrow-back"
                size={27}
                color={theme === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
          ),
        }}
        name="NewsDetails"
        component={NewsDetails}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
