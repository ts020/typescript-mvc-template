///<reference path="Model.ts" />
///<reference path="View.ts" />
module app {
    export class Controller {
        view:View;
        model:Model;

        constructor(initialData:any=null) {
            this.model = new Model(initialData);
            this.view = new View(this.model);
        }

        showName(label:string):void {
            this.model.setName(label);
        }
    }
}