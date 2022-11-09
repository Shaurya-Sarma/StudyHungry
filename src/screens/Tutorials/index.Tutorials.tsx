import { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getYouTubeData } from "../../api/YouTubeAPI";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import VideoCard from "../../components/Tutorials/VideoCard";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";

export default function Tutorials() {
  const { width } = useWindowDimensions();
  let [isLoading, setIsLoading] = useState(true);
  let [refreshing, setRefreshing] = useState(false);
  let [query, setQuery] = useState<
    {
      title: string;
      subtitle: string;
      thumbnail: string;
      url: string;
    }[]
  >();

  const fetchData = async () => {
    getYouTubeData().then((data) => {
      if (data.length >= 5) {
        setQuery([...data]);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData()
      .then(() => setRefreshing(false))
      .catch(console.error);
  }, []);

  return (
    <>
      <FocusedStatusBar barStyle="light-content" />
      <SafeAreaView style={isLoading ? { flex: 1 } : styles.container}>
        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
            size="large"
          />
        ) : (
          <>
            <Text style={styles.title}>{STRINGS.tutorialsTitle}</Text>
            <View style={[styles.main, { width: width }]}>
              <View style={{ height: "80%" }}>
                <ScrollView
                  showsVerticalScrollIndicator={true}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {query?.map((q, index) => {
                    return (
                      <VideoCard
                        key={index}
                        title={q.title}
                        subtitle={q.subtitle}
                        link={q.url}
                        image={q.thumbnail}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    color: COLORS.white,
    fontFamily: "Nunito-ExtraBold",
    fontSize: 32,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  main: {
    backgroundColor: COLORS.white,
    height: "100%",
    borderTopRightRadius: 40,
    paddingTop: 10,
  },
  error: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Nunito-ExtraBold",
    fontSize: 16,
    color: COLORS.black,
  },
});
