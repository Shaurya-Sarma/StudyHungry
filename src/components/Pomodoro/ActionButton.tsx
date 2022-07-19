import { StyleSheet, TouchableOpacity } from "react-native";

function actionHandler(actionType: string) {}

export const ActionButton = (props: { name: string }) => {
  return (
    <TouchableOpacity onPress={() => actionHandler(props.name)}>
      //TODO CREATE NEW ICON TAG AND DYNAMICALLY ADD BASED ON PROPS.NAME
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
