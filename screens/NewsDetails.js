import * as Linking from "expo-linking";
import i18n from "i18n-js";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Share, StyleSheet, Text } from "react-native";
import { Button, Card, ActivityIndicator } from "react-native-paper";
import newAPI from "../apis/News";
import { ThemeContext } from "../context-store/context";
import { Entypo } from "@expo/vector-icons";

const NewsDetails = ({ route }) => {
  const [news, setNews] = useState(null);
  //Share function
  const onShare = async (link) => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //on component mount check if incoming link or using homescreen navigation
  useEffect(() => {
    //if coming from external link, parse the parameters and use them to query the news
    //using the author name and keyword to find the corresponding article
    if (route.params.id) {
      let string = "everything?q=world" + "&language=" + route.params.lang;
      if (route.params.keyword) {
        string =
          "everything?q=" +
          route.params.keyword +
          "&language=" +
          route.params.lang;
      }

      newAPI
        .get(string + "&apiKey=87eac6de1c49426fada443bc1687e911")
        .then(async function (response) {
          const result = response.data.articles.filter((value) => {
            return JSON.stringify(value.author).includes(
              route.params.id.replace(/%20/g, " ")
            );
          });

          setNews(result[0]);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    }
    //if not coming from external link just use the incoming news object from route
    else setNews(route.params);

    return () => {};
  }, []);

  const { theme } = useContext(ThemeContext);

  if (!news)
    return (
      <ScrollView style={{}}>
        <ActivityIndicator
          color={theme === "light" ? "black" : "white"}
        ></ActivityIndicator>
      </ScrollView>
    );
  return (
    news && (
      <ScrollView
        style={
          theme === "light" ? styles.container_light : styles.container_dark
        }
      >
        <Card
          style={
            theme === "light" ? styles.container_light : styles.container_dark
          }
          mode="outlined"
        >
          <Card.Cover source={{ uri: news.urlToImage }} />
          <Card.Content>
            <Text
              style={theme === "light" ? styles.title_light : styles.title_dark}
            >
              {news.title}
            </Text>
            <Text
              style={theme === "light" ? styles.text_light : styles.text_dark}
              numberOfLines={3}
            >
              {news.content}
            </Text>
          </Card.Content>
          <Card.Actions style={styles.card_actions}>
            <Button
              style={{ alignSelf: "flex-end" }}
              color={theme === "light" ? "black" : "white"}
              onPress={() => {
                const link = Linking.createURL("/newsdetails/", {
                  queryParams: {
                    id: news.author,
                    keyword: news.keyWord,
                    lang: news.language,
                  },
                });

                onShare(link);
              }}
            >
              <Text
                style={
                  theme === "light" ? styles.button_light : styles.button_dark
                }
              >
                {i18n.t("Details.Share")}
              </Text>
            </Button>
            <Button
              mode={"contained"}
              color={theme === "light" ? "black" : "white"}
              style={{ alignSelf: "flex-end", marginLeft: 5 }}
              onPress={() => {
                Linking.openURL(news.url);
              }}
            >
              <Text
                style={
                  theme === "light" ? styles.button_dark : styles.button_light
                }
              >
                {i18n.t("Details.GoToArticle")}
              </Text>
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    )
  );
};
const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    padding: 1,
    backgroundColor: "white",
    flexDirection: "column",
    padding: 0,
  },
  container_dark: {
    flex: 1,
    padding: 0,
    backgroundColor: "black",
    flexDirection: "column",
    padding: 0,
  },
  text_light: {
    color: "black",
  },
  text_dark: {
    color: "white",
  },
  button_light: {
    color: "black",
    fontWeight: "bold",
  },
  button_dark: {
    color: "white",
    fontWeight: "bold",
  },
  title_light: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginVertical: 10,
  },
  title_dark: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  card_actions: {
    marginTop: 10,
    display: "flex",
    alignContent: "flex-start",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});
export default NewsDetails;
