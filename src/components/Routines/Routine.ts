import Interval from "./Interval";
import uuid from "react-native-uuid";

export default class Routine {
  name: string;
  uuid: string;
  isEnabled:boolean;
  intervals:Interval[];

  constructor(name:string, intervals: Interval[]) {
    this.name = name;
    this.uuid = "routine-" + uuid.v4().toString();
    this.isEnabled = false;
    this.intervals = intervals;
  }
}
