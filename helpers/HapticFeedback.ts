import * as Haptics from "expo-haptics";


export default function addHapticFeedback(type:string) {
  if(type === "light") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  if(type === "medium") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

}