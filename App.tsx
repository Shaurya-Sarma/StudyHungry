import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./src/components/Navigation/BottomTabNavigation";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Nunito-Black": require("./assets/fonts/Nunito-Black.ttf"),
          "Nunito-ExtraBold": require("./assets/fonts/Nunito-ExtraBold.ttf"),
          "Nunito-Medium": require("./assets/fonts/Nunito-Medium.ttf"),
          "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
          "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Navigation></Navigation>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
