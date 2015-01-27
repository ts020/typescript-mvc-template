module olib.utils {
    export function addClass(dom:HTMLElement, className:string):void {
        var classList = dom.className.split(" ");
        if (classList.indexOf(className) != -1) {
            return;
        }

        classList.push(className);
        dom.className = classList.join(" ");
    }

    export function removeClass(dom:HTMLElement, className:string):void {
        dom.className = dom.className
            .split(" ")
            .filter(function (d) {
                return d != className
            })
            .join(" ");
    }

    export function toggleClass(dom:HTMLElement, className:string):void {
        var classList = dom.className.split(" ");
        if (classList.indexOf(className) != -1) {
            removeClass(dom, className);
            return;
        }
        classList.push(className);
        dom.className = classList.join(" ");
    }

    export function getAbsoluteRect(element):{x:number;y:number; width:number; height:number} {
        var x = 0, y = 0;
        var w = element.offsetWidth;
        var h = element.offsetHeight;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
        } while (element = element.offsetParent);
        return {x: x, y: y, width: w, height: h};
    }

    export function domEach(selector:string, handler:(data:HTMLElement)=>void) {
        var domList = document.querySelectorAll(selector);
        for (var i = 0; i < domList.length; i++) {
            handler(<HTMLElement>domList.item(i));
        }
    }

    export function createDom(nodeName:string, attr:any):HTMLElement {
        var dom = document.createElement(nodeName);
        setAttr(dom, attr);
        return dom;
    }

    export function setAttr(dom:HTMLElement, attr:any) {
        for (var prop in attr) {
            if (prop == "style" && typeof attr[prop] != "string") {
                setStyle(dom, attr[prop]);
            } else if (prop.indexOf("on") == 0) {
                dom.addEventListener(prop.slice(2), attr[prop]);
            } else if (prop == "html") {
                dom.innerHTML = attr[prop];
            } else {
                dom.setAttribute(prop, attr[prop]);
            }
        }
    }

    export function setStyle(dom, styles:any) {
        for (var styleName in styles) {
            dom.style[styleName] = styles[styleName];
        }
    }

    export function domTrigger(dom:HTMLElement, type:string):void {
        var e = document.createEvent("HTMLEvents");
        e.initEvent(type, true, true);
        dom.dispatchEvent(e);
    }

    export class StringUtil {
        static addZero(num):string {
            var len = 3 - num.toString().length;
            var pre = "";
            for (var i = 0; i < len; i++) {
                pre += "0";
            }
            return pre + num;
        }
    }

}
