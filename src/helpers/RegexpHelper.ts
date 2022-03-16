export class RegexpHelper {
    private static timeRegexpString = /^(\d?\d:\d\d)$/
    private static timeRegexp = new RegExp(RegexpHelper.timeRegexpString)

    static timeFormatIsValid(stringValue: string): boolean {
        return RegexpHelper.timeRegexp.test(stringValue);
    }

     static extractTime(stringValue: string): string {
         let matchArray = stringValue.match(this.timeRegexp);
        console.log("matchArray", matchArray);
        return matchArray?.find(() => true) || "";
     }
}
