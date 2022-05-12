import { Text, View, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Divider } from "react-native-paper";

const win = Dimensions.get("window");
const NewsCard = ({ news, navigation }) => {
  const [ImageUrl, setImage] = useState(news.urlToImage);
  const handlepress = (news) => {
    navigation.navigate("NewsDetails", news);
    console.log("iam here");
  };
  let date = new Date(Date.parse(news.publishedAt));
  if (!news.description) return null;

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 5,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        borderBottomColor: "gray",
        borderBottomWidth: "0.1",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          handlepress(news);
        }}
      >
        <Text
          numberOfLines={3}
          style={{
            marginLeft: 2,
            width: win.width - win.width / 4 - 20,
            fontWeight: "bold",
            alignSelf: "flex-start",
            fontSize: 17,
          }}
        >
          {news.description}
        </Text>
        <Text
          style={{ fontSize: 11, marginLeft: 2, marginTop: 10, opacity: 0.5 }}
        >
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      <Image
        onError={(error) => {}}
        style={{
          alignSelf: "flex-end",
          marginLeft: 10,
          width: win.width / 4,
          height: win.height / 10,
          borderRadius: 20,
          position: "relative",
        }}
        resizeMode={"cover"}
        source={{ uri: ImageUrl }}
        defaultSource={require("../unnamed.png")}
      />
      <Divider />
    </View>
  );
};

export default NewsCard;
