import {Platform } from "react-native";

const generateBoxShadowStyle = (
  xOffset: number,
  yOffset : number,
  shadowColorIos : string,
  shadowOpacity : number,
  shadowRadius : number,
  elevation : number,
  shadowColorAndroid : string,
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  } else {
    return {}
  }
};

export default generateBoxShadowStyle;