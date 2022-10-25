import { Modal } from "react-native";
import { StyleSheet } from "react-native";

export default function SettingsModal(props: any) {
  return <Modal visible={props.isSettingsVisible}></Modal>;
}

const styles = StyleSheet.create({});
