///<reference path="olib/reactive/ModelBase.ts" />
module app {
    export class Model extends olib.reactive.ModelBase {
        protected init(initialData:any = null):void {
            this.name = initialData ? initialData.name || "" : "";
        }

        setName(label:string):void {
            this.name = label;
        }

        set name(value:string) {
            this.setProperty("name",value);
        }

        get name():string {
            return this.getProperty("name");
        }

    }
}