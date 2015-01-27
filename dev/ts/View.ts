///<reference path="olib/reactive/ViewBase.ts" />
///<reference path="Model.ts" />
module app {
    export class View extends olib.reactive.ViewBase<Model> {
        nameLabel:HTMLElement;
        protected init():void {
            this.nameLabel = <HTMLElement>document.querySelector("#nameLabel");
            this.update();
        }

        update():void {
            this.bind("name", (value)=>{
                this.nameLabel.innerHTML = value;
            });
        }
    }
}