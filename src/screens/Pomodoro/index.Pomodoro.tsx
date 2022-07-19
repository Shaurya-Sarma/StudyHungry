import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import pageData from "../../components/Pomodoro/pages";
import PomodoroPage from "../../components/Pomodoro/PomodoroPage";
import styles from "./styles.Pomodoro";

export default function Pomodoro() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pageData}
        renderItem={({ item }) => <PomodoroPage itemData={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </SafeAreaView>
  );
}
