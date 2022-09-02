export class Utilities {

    static pad(num: any, length: number) {
        var str = '' + num;
        while (str.length < length) {
            str = '0' + str;
        }

        return str;
    }
}
