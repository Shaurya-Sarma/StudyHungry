import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";
import * as WebBrowser from "expo-web-browser";

export default function VideoCard(props: any) {
  return (
    <View style={[styles.card, styles.cardShadow]}>
      <TouchableOpacity
        onPress={() => {
          WebBrowser.openBrowserAsync(props.link);
        }}
      >
        <Image
          style={[styles.cardImage, styles.cardShadow]}
          source={{
            uri: props.image,
          }}
          defaultSource={require("../../../assets/images/Default_Image.jpg")}
        />
      </TouchableOpacity>
      <View style={styles.cardText}>
        <Text style={styles.heading}>Tips for A+ Students</Text>
        <Text style={styles.description}>Read more about it here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  cardShadow: generateBoxShadowStyle(
    0,
    0,
    COLORS.black,
    0.15,
    5,
    5,
    COLORS.black10
  ),
  cardImage: {
    height: 200,
    borderRadius: 10,
  },
  cardText: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Nunito-ExtraBold",
  },
  description: {
    fontSize: 14,
    fontFamily: "Nunito-Medium",
  },
});
