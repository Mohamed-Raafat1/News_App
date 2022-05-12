import { StyleSheet, Text, ScrollView, Button, Image } from "react-native";
import { Dimensions } from "react-native";
const win = Dimensions.get("window");
const NewsDetails = ({ route, navigation }) => {
  const news = route.params;

  return (
    <ScrollView>
      <Text
        style={{
          marginBottom: 10,
          fontWeight: "bold",
          fontFamily: "NewsCycle_700Bold",
          fontSize: 20,
        }}
      >
        {news.title}
      </Text>
      <Image
        style={{
          alignSelf: "center",
          borderRadius: 5,
          width: win.width - 10,
          height: win.height / 4,
        }}
        source={{ uri: news.urlToImage }}
      ></Image>
      <Text
        numberOfLines={3}
        style={{
          marginTop: 8,
          marginHorizontal: 10,
          marginBottom: 20,

          fontSize: 15,
        }}
      >
        {news.content}
      </Text>
    </ScrollView>
  );
};

export default NewsDetails;
