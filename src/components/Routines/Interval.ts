export default class Interval {
 type:IntervalType; 
 length:number; // length of the interval in seconds 

  constructor(type:IntervalType, length:number) {
    this.type = type;
    this.length = length;
  }
}


export enum IntervalType {
  Work,
  Break
}