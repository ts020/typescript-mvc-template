/**
 * Created by uu071639 on 2014/12/03.
 */
module olib {
    export class Identifier {
        static create(prefix:string = null):Identifier {
            return new Identifier(prefix || "");
        }

        id:string;

        constructor(prefix:string) {
            this.id = prefix + (new Date().getTime() * Math.random()).toString()
        }

        key(str:string) {
            return this.id + str;
        }
    }
}