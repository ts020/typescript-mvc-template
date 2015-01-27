module olib {
    export var frameRateSec = Math.floor(1000 / 60);
    export var asyncQueList:{handler:Function; id:string}[];

    export function async(handler:Function, queID:string = null):void {
        if (asyncQueList == null) {
            asyncQueList = [];
        }
        if (queID) {
            asyncQueList = asyncQueList.filter(function (que:{handler:Function; id:string}) {
                return que.id != queID
            });
        }
        asyncQueList.push({
            handler: handler,
            id: queID
        });
        startQue();
    }

    export var queStarted:boolean = false;
    export var timerID:number = -1;

    export function startQue() {
        if (!queStarted) {
            queStarted = true;
            timerID = setInterval(function () {
                if (asyncQueList.length == 0) {
                    clearInterval(timerID);
                    queStarted = false;
                } else {
                    asyncQueList.shift().handler();
                }
            }, frameRateSec);
        }
    }
}