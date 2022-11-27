import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "../../res/colors/Colors";
import Routines from "../../screens/Routines/index.Routines";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoutineForm from "../Routines/RoutineForm";

export default function RoutinesStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator initialRouteName="Routines">
        <Stack.Screen
          name="Routines"
          component={Routines}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoutineForm"
          component={RoutineForm}
          options={({ navigation }) => ({
            headerTransparent: true,
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.pop();
                }}
                style={{ marginLeft: 20 }}
              >
                <AntDesign name="arrowleft" size={28} color={COLORS.purple} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
}
