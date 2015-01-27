module olib.utils {
    export class ObjectUtil {
        static forEach(target:any, handler:(value:any, key:string)=>void):any {
            Object.keys(target).forEach((key)=>{
                handler(target[key],key);
            })
        }

        static filter(target:any, handler:(value:string,key:string)=>boolean):any {
            var result = {};
            ObjectUtil.forEach(target, (value:string, key:string):void=>{
                if(handler(value, key)){
                    result[key] = value;
                }
            });
            return result;
        }
        
        static deepCopy(target:any, addValue:any=null):any {
            var result = {};
            ObjectUtil.forEach(target, (value:any, key:string)=>{
                if(value != null && typeof target[key] == "object") {
                    result[key] = ObjectUtil.deepCopy(value);
                } else {
                    result[key] = value;
                }
            });

            if(addValue){
                ObjectUtil.forEach(addValue, (value:any, key:string)=>{
                    if(value != null && typeof target[key] == "object") {
                        result[key] = ObjectUtil.deepCopy(value);
                    } else {
                        result[key] = value;
                    }
                });
            }
            target = null;
            addValue = null;
            return result;
        }
    }
}