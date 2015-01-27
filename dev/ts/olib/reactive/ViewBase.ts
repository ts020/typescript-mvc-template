///<reference path="../core/Observer.ts" />
///<reference path="../core/Identifier.ts" />
///<reference path="ModelBase.ts" />
module olib.reactive {
    export class ViewBase<M extends ModelBase> extends Observer {
        protected identity:Identifier;
        protected model:M;

        constructor(model:M) {
            super();
            this.identity = Identifier.create("olib.view.");
            model.on("change", this.update.bind(this));
            this.model = model;
            this.init();
        }

        protected async(handler:Function, queID:string = "") {
            olib.async(handler, this.identity.key(queID));
        }

        protected init():void {

        }

        update():void {

        }

        protected get winReceiver():Observer {
            return getWinReceiver();
        }

        bind(propertyName:string, callback:Function) {
            this.model.changedCall(propertyName, callback);
        }
    }


    export var _DomEventReceiver_Instance:Observer;

    export function getWinReceiver():Observer {
        if (_DomEventReceiver_Instance == null) {
            _DomEventReceiver_Instance = new Observer();
            var id = Identifier.create("DomEventReceiver");
            window.addEventListener("resize", function () {
                _DomEventReceiver_Instance.lazyTrigger("resize", null, id.key("resize"))
            });
        }
        return _DomEventReceiver_Instance;
    }
}