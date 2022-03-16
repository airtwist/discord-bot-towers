import {RegexpHelper} from "../helpers/RegexpHelper";

export class TimeSpan {
    hours: string = "";
    minutes: string = "";

    private constructor(hours: string, minutes: string) {
        this.hours = hours;
        this.minutes = minutes;
    }

    static parse(stingValue: string): TimeSpan {
        var timeSplit = stingValue.split(":")
        var hour = timeSplit[0];
        var minute = timeSplit[1];
        console.log("stringValue " + stingValue)

        console.log("hour" + hour)
        console.log("minute" + minute)
        return new TimeSpan(hour, minute);
    }

    toString(): string {
        return `${this.hours}:${this.minutes}`;
    }
}