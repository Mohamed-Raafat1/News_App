import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import newAPI from "../apis/News";
import NewsCard from "../components/NewsCard";
import { ThemeContext } from "../context-store/context";
import NewsDetails from "./NewsDetails";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import i18n from "i18n-js";

const Stack = createNativeStackNavigator();
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [Refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getNewsFromAPI();
    setRefreshing(false);
    console.log("done");
  }, []);
  const [Loading, setLoading] = useState(true);
  function getNewsFromAPI() {
    newAPI
      .get("everything?q=world&apiKey=0d4c4729aa7f415d8c6ea5ddb3382d64")
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
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNewsFromAPI();
  }, []);
  useEffect(() => {}, [news]);

  if (!news) return <Text> fuck</Text>;

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
      {news.map((object, index) => (
        <View>
          <NewsCard
            key={index + object.urlToImage}
            navigation={navigation}
            news={object}
          />
        </View>
      ))}
    </ScrollView>
  );
};
const HomeStackScreen = ({ navigation }) => {
  const { theme, setTheme } = useContext(ThemeContext);
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
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: theme === "light" ? "white" : "black",
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
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
