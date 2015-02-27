module olib {
	export var queMap:any = {};
	export var queStarted:boolean = false;
	export var count:number = 0;

    export function async(handler:Function, queID:string = null):void {
	    queMap[queID || Date.now() + "_" + count] = {
		    handler: handler
	    };
	    count++;
	    if (!queStarted) {
		    queStarted = true;
		    window.requestAnimationFrame(()=>{
			    var keys = Object.keys(queMap);
			    keys.forEach(function(key){
				    queMap[key].handler();
				    delete queMap[key];
			    });
			    queStarted = false;
		    });
	    }
    }
}
