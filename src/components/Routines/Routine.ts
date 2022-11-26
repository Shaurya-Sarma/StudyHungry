import Interval from "./Interval";

export default class Routine {
  name: string;
  isEnabled:boolean;
  intervals:Interval[];

  constructor(name:string, intervals: Interval[]) {
    this.name = name;
    this.isEnabled = false;
    this.intervals = intervals;
  }
}
