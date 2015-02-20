var olib;
(function (olib) {
    olib.queMap = {};
    olib.queStarted = false;
    olib.count = 0;
    function async(handler, queID) {
        if (queID === void 0) { queID = null; }
        if (olib.queMap[queID]) {
            olib.queMap[queID].handler = handler;
            return;
        }
        olib.queMap[queID || Date.now() + "_" + olib.count] = {
            handler: handler
        };
        olib.count++;
        if (!olib.queStarted) {
            olib.queStarted = true;
            window.requestAnimationFrame(function () {
                var keys = Object.keys(olib.queMap);
                keys.forEach(function (key) {
                    olib.queMap[key].handler();
                });
                olib.queMap = {};
                olib.queStarted = false;
            });
        }
    }
    olib.async = async;
})(olib || (olib = {}));
var olib;
(function (olib) {
    var Observer = (function () {
        function Observer() {
            this.listeners = {};
        }
        Observer.prototype.getListener = function (type) {
            return this.listeners[type] || (this.listeners[type] = []);
        };
        Observer.prototype.contain = function (type, handler) {
            return this.getListener(type).indexOf(handler) != -1;
        };
        Observer.prototype.on = function (type, handler) {
            this.getListener(type).push(handler);
        };
        Observer.prototype.off = function (type, handler) {
            if (handler === void 0) { handler = null; }
            if (!handler) {
                this.listeners = [];
                return;
            }
            if (!this.contain(type, handler)) {
                return;
            }
            var list = this.getListener(type);
            for (var i = 0; i < list.length; i++) {
                if (list[i] == handler) {
                    list.splice(i, 1);
                    return;
                }
            }
        };
        Observer.prototype.trigger = function (type, data) {
            if (data === void 0) { data = null; }
            var sender = { type: type, data: data };
            this.getListener(type).forEach(function (hanlder) {
                try {
                    hanlder(sender);
                }
                catch (error) {
                    if (window["console"]) {
                        console.error(error.stack);
                    }
                }
            });
            this.calledTrigger(type, data);
        };
        Observer.prototype.calledTrigger = function (type, data) {
        };
        Observer.prototype.lazyTrigger = function (type, data, queID) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (queID === void 0) { queID = null; }
            olib.async(function () {
                _this.trigger(type, data);
            }, queID);
        };
        return Observer;
    })();
    olib.Observer = Observer;
})(olib || (olib = {}));
var olib;
(function (olib) {
    var Identifier = (function () {
        function Identifier(prefix) {
            this.id = prefix + (new Date().getTime() * Math.random()).toString();
        }
        Identifier.create = function (prefix) {
            if (prefix === void 0) { prefix = null; }
            return new Identifier(prefix || "");
        };
        Identifier.prototype.key = function (str) {
            return this.id + str;
        };
        return Identifier;
    })();
    olib.Identifier = Identifier;
})(olib || (olib = {}));
var olib;
(function (olib) {
    var utils;
    (function (utils) {
        function addClass(dom, className) {
            var classList = dom.className.split(" ");
            if (classList.indexOf(className) != -1) {
                return;
            }
            classList.push(className);
            dom.className = classList.join(" ");
        }
        utils.addClass = addClass;
        function removeClass(dom, className) {
            dom.className = dom.className.split(" ").filter(function (d) {
                return d != className;
            }).join(" ");
        }
        utils.removeClass = removeClass;
        function toggleClass(dom, className) {
            var classList = dom.className.split(" ");
            if (classList.indexOf(className) != -1) {
                removeClass(dom, className);
                return;
            }
            classList.push(className);
            dom.className = classList.join(" ");
        }
        utils.toggleClass = toggleClass;
        function getAbsoluteRect(element) {
            var x = 0, y = 0;
            var w = element.offsetWidth;
            var h = element.offsetHeight;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
            } while (element = element.offsetParent);
            return { x: x, y: y, width: w, height: h };
        }
        utils.getAbsoluteRect = getAbsoluteRect;
        function domEach(selector, handler) {
            var domList = document.querySelectorAll(selector);
            for (var i = 0; i < domList.length; i++) {
                handler(domList.item(i));
            }
        }
        utils.domEach = domEach;
        function createDom(nodeName, attr) {
            var dom = document.createElement(nodeName);
            setAttr(dom, attr);
            return dom;
        }
        utils.createDom = createDom;
        function setAttr(dom, attr) {
            for (var prop in attr) {
                if (prop == "style" && typeof attr[prop] != "string") {
                    setStyle(dom, attr[prop]);
                }
                else if (prop.indexOf("on") == 0) {
                    dom.addEventListener(prop.slice(2), attr[prop]);
                }
                else if (prop == "html") {
                    dom.innerHTML = attr[prop];
                }
                else {
                    dom.setAttribute(prop, attr[prop]);
                }
            }
        }
        utils.setAttr = setAttr;
        function setStyle(dom, styles) {
            for (var styleName in styles) {
                dom.style[styleName] = styles[styleName];
            }
        }
        utils.setStyle = setStyle;
        function domTrigger(dom, type) {
            var e = document.createEvent("HTMLEvents");
            e.initEvent(type, true, true);
            dom.dispatchEvent(e);
        }
        utils.domTrigger = domTrigger;
        var StringUtil = (function () {
            function StringUtil() {
            }
            StringUtil.addZero = function (num) {
                var len = 3 - num.toString().length;
                var pre = "";
                for (var i = 0; i < len; i++) {
                    pre += "0";
                }
                return pre + num;
            };
            return StringUtil;
        })();
        utils.StringUtil = StringUtil;
    })(utils = olib.utils || (olib.utils = {}));
})(olib || (olib = {}));
var olib;
(function (olib) {
    var utils;
    (function (utils) {
        var ObjectUtil = (function () {
            function ObjectUtil() {
            }
            ObjectUtil.forEach = function (target, handler) {
                Object.keys(target).forEach(function (key) {
                    handler(target[key], key);
                });
            };
            ObjectUtil.filter = function (target, handler) {
                var result = {};
                ObjectUtil.forEach(target, function (value, key) {
                    if (handler(value, key)) {
                        result[key] = value;
                    }
                });
                return result;
            };
            ObjectUtil.deepCopy = function (target, addValue) {
                if (addValue === void 0) { addValue = null; }
                var result = {};
                ObjectUtil.forEach(target, function (value, key) {
                    if (value != null && typeof target[key] == "object") {
                        result[key] = ObjectUtil.deepCopy(value);
                    }
                    else {
                        result[key] = value;
                    }
                });
                if (addValue) {
                    ObjectUtil.forEach(addValue, function (value, key) {
                        if (value != null && typeof target[key] == "object") {
                            result[key] = ObjectUtil.deepCopy(value);
                        }
                        else {
                            result[key] = value;
                        }
                    });
                }
                target = null;
                addValue = null;
                return result;
            };
            return ObjectUtil;
        })();
        utils.ObjectUtil = ObjectUtil;
    })(utils = olib.utils || (olib.utils = {}));
})(olib || (olib = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var olib;
(function (olib) {
    var reactive;
    (function (reactive) {
        var ModelBase = (function (_super) {
            __extends(ModelBase, _super);
            function ModelBase(initialData) {
                if (initialData === void 0) { initialData = null; }
                _super.call(this);
                this.propertyMap = {};
                this.changedMap = {};
                this.identity = olib.Identifier.create("olib.model.");
                this.init(initialData);
            }
            ModelBase.prototype.init = function (initialData) {
                if (initialData === void 0) { initialData = null; }
            };
            ModelBase.prototype.setProperty = function (name, value) {
                if (this.propertyMap[name] != value) {
                    this.propertyMap[name] = value;
                    this.changedMap[name] = true;
                    this.changedData();
                }
            };
            ModelBase.prototype.getProperty = function (name) {
                return this.propertyMap[name];
            };
            ModelBase.prototype.changedCall = function (name, callback) {
                if (this.changedMap[name]) {
                    callback(this.getProperty(name));
                }
            };
            ModelBase.prototype.changedData = function () {
                this.lazyTrigger("change", null, this.identity.key(".change"));
            };
            ModelBase.prototype.calledTrigger = function (type, data) {
                var _this = this;
                if (type == "change") {
                    olib.utils.ObjectUtil.forEach(this.changedMap, function (item, key) {
                        _this.changedMap[key] = false;
                    });
                }
            };
            ModelBase.prototype.async = function (handler, queID) {
                if (queID === void 0) { queID = ""; }
                olib.async(handler, this.identity.key(queID));
            };
            return ModelBase;
        })(olib.Observer);
        reactive.ModelBase = ModelBase;
    })(reactive = olib.reactive || (olib.reactive = {}));
})(olib || (olib = {}));
var app;
(function (app) {
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model() {
            _super.apply(this, arguments);
        }
        Model.prototype.init = function (initialData) {
            if (initialData === void 0) { initialData = null; }
            this.name = initialData ? initialData.name || "" : "";
        };
        Model.prototype.setName = function (label) {
            this.name = label;
        };
        Object.defineProperty(Model.prototype, "name", {
            get: function () {
                return this.getProperty("name");
            },
            set: function (value) {
                this.setProperty("name", value);
            },
            enumerable: true,
            configurable: true
        });
        return Model;
    })(olib.reactive.ModelBase);
    app.Model = Model;
})(app || (app = {}));
var olib;
(function (olib) {
    var reactive;
    (function (reactive) {
        var ViewBase = (function (_super) {
            __extends(ViewBase, _super);
            function ViewBase(model) {
                _super.call(this);
                this.identity = olib.Identifier.create("olib.view.");
                model.on("change", this.update.bind(this));
                this.model = model;
                this.init();
            }
            ViewBase.prototype.async = function (handler, queID) {
                if (queID === void 0) { queID = ""; }
                olib.async(handler, this.identity.key(queID));
            };
            ViewBase.prototype.init = function () {
            };
            ViewBase.prototype.update = function () {
            };
            Object.defineProperty(ViewBase.prototype, "winReceiver", {
                get: function () {
                    return getWinReceiver();
                },
                enumerable: true,
                configurable: true
            });
            ViewBase.prototype.bind = function (propertyName, callback) {
                this.model.changedCall(propertyName, callback);
            };
            return ViewBase;
        })(olib.Observer);
        reactive.ViewBase = ViewBase;
        reactive._DomEventReceiver_Instance;
        function getWinReceiver() {
            if (reactive._DomEventReceiver_Instance == null) {
                reactive._DomEventReceiver_Instance = new olib.Observer();
                var id = olib.Identifier.create("DomEventReceiver");
                window.addEventListener("resize", function () {
                    reactive._DomEventReceiver_Instance.lazyTrigger("resize", null, id.key("resize"));
                });
            }
            return reactive._DomEventReceiver_Instance;
        }
        reactive.getWinReceiver = getWinReceiver;
    })(reactive = olib.reactive || (olib.reactive = {}));
})(olib || (olib = {}));
var app;
(function (app) {
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            _super.apply(this, arguments);
        }
        View.prototype.init = function () {
            this.nameLabel = document.querySelector("#nameLabel");
            this.update();
        };
        View.prototype.update = function () {
            var _this = this;
            this.bind("name", function (value) {
                _this.nameLabel.innerHTML = value;
            });
        };
        return View;
    })(olib.reactive.ViewBase);
    app.View = View;
})(app || (app = {}));
var app;
(function (app) {
    var Controller = (function () {
        function Controller(initialData) {
            if (initialData === void 0) { initialData = null; }
            this.model = new app.Model(initialData);
            this.view = new app.View(this.model);
        }
        Controller.prototype.showName = function (label) {
            this.model.setName(label);
        };
        return Controller;
    })();
    app.Controller = Controller;
})(app || (app = {}));
