import uuid from "react-native-uuid";

export default class Task {
  description: string;
  uuid: string;
  isChecked:boolean;

  constructor(description:string) {
    this.description = description;
    this.uuid = "task-" + uuid.v4().toString();
    this.isChecked = false;
  }
  
}
