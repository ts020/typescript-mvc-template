/**
 * Created by uu071639 on 2014/12/03.
 */
///<reference path="../core/Observer.ts" />
///<reference path="../core/Identifier.ts" />
///<reference path="../utils/Util.ts" />
module olib.reactive {

    export class ModelBase extends Observer {
        protected identity:Identifier;
        private propertyMap:any;
        private changedMap:any;
        constructor(initialData:any = null) {
            super();
            this.propertyMap = {};
            this.changedMap = {};
            this.identity = Identifier.create("olib.model.");
            this.init(initialData);
        }

        protected init(initialData:any = null):void {

        }

        protected setProperty(name:string, value:any):void {
            if(this.propertyMap[name] != value) {
                this.propertyMap[name] = value;
                this.changedMap[name] = true;
                this.changedData();
            }
        }

        protected getProperty(name:string):any {
            return this.propertyMap[name];
        }

        changedCall(name:string, callback:Function) {
            if(this.changedMap[name]) {
                callback(this.getProperty(name));
            }
        }

        protected changedData():void {
            this.lazyTrigger("change", null, this.identity.key(".change"));
        }

        protected calledTrigger(type:string, data:any) {
            if(type == "change") {
                utils.ObjectUtil.forEach(this.changedMap, (item, key)=>{
                    this.changedMap[key] = false;
                })
            }
        }

        protected async(handler:Function, queID:string = "") {
            olib.async(handler, this.identity.key(queID));
        }
    }
}