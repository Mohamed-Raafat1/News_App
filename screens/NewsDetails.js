import * as Linking from "expo-linking";
import { useContext } from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import { ThemeContext } from "../context-store/context";
import i18n from "i18n-js";

const win = Dimensions.get("window");
const NewsDetails = ({ route, navigation }) => {
  //retrieving news object from the navigation params
  const { theme, setTheme } = useContext(ThemeContext);
  const news = route.params;
  const link = Linking.createURL("/home/newsdetials", {
    queryParams: { news },
  });

  return (
    <ScrollView
      style={theme === "light" ? styles.container_light : styles.container_dark}
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
        <Card.Actions
          style={{
            display: "flex",
            alignContent: "flex-start",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              let { queryParams } = Linking.parse(link);
              console.log(Linking.parse(link));
            }}
          >
            {i18n.t("Details.Share")}
          </Button>
          <Button
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              Linking.openURL(news.url);
              console.log(news.url);
            }}
          >
            {i18n.t("Details.GoToArticle")}
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
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
});
export default NewsDetails;
