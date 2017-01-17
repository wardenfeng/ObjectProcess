var feng3d;
(function (feng3d) {
    var objectprocess;
    (function (objectprocess) {
        function isBaseType(data) {
            return typeof data == "number" || typeof data == "boolean" || typeof data == "string";
        }
        objectprocess.isBaseType = isBaseType;
        function clone(source) {
            if (isBaseType(source))
                return source;
            var prototype = source["prototype"] ? source["prototype"] : Object.getPrototypeOf(source);
            var target = new prototype.constructor();
            for (var attribute in source) {
                target[attribute] = source[attribute];
            }
            return target;
        }
        objectprocess.clone = clone;
        function merge(source, mergeData) {
            if (isBaseType(mergeData))
                return mergeData;
            var target = clone(source);
            for (var mergeAttribute in mergeData) {
                target[mergeAttribute] = merge(source[mergeAttribute], mergeData[mergeAttribute]);
            }
            return target;
        }
        objectprocess.merge = merge;
        function watchObject(object, onChanged = null) {
            for (var key in object) {
                watch(object, key, onChanged);
            }
        }
        objectprocess.watchObject = watchObject;
        function watch(object, attribute, onChanged = null) {
            if (!object.orig) {
                Object.defineProperty(object, "orig", {
                    value: {},
                    enumerable: false,
                    writable: false
                });
            }
            object.orig[attribute] = object[attribute];
            Object.defineProperty(object, attribute, {
                get: function () {
                    return this.orig[attribute];
                },
                set: function (value) {
                    if (onChanged) {
                        onChanged(this, attribute, this.orig[attribute], value);
                    }
                    this.orig[attribute] = value;
                }
            });
        }
        objectprocess.watch = watch;
        function unwatchObject(object) {
            if (!object.orig)
                return;
            for (var key in object.orig) {
                unwatch(object, key);
            }
            delete object.orig;
        }
        objectprocess.unwatchObject = unwatchObject;
        function unwatch(object, attribute) {
            Object.defineProperty(object, attribute, {
                value: object.orig[attribute],
                enumerable: true,
                writable: true
            });
        }
        objectprocess.unwatch = unwatch;
    })(objectprocess = feng3d.objectprocess || (feng3d.objectprocess = {}));
})(feng3d || (feng3d = {}));
function testMerge() {
    var foo = new Foo();
    var bar = feng3d.objectprocess.merge(foo, { a: { b: 2 } }); // 使用 merge 赋值
    console.log(bar.a.b); // 像原生 Object 一样取值，打印 2
    console.log(foo.a.b); // 像原生 Object 一样取值，打印 1
    console.log(foo === bar); //  打印 false
    console.log(foo.b === bar.b); //  打印 true
}
class Foo {
    constructor() {
        this.a = new A();
        this.b = { b0: 1, b2: 2 };
        this.c = 3;
    }
}
class A {
    constructor() {
        this.b = 1;
    }
}
// testMerge();
function testWatchObject() {
    var foo = { a: 1, b: 2, c: 3 };
    console.log("watchObject");
    feng3d.objectprocess.watchObject(foo, onChanged);
    // foo.a = 1;
    for (var key in foo) {
        foo[key] = ~~foo[key] + 1;
    }
    console.log("unwatchObject");
    feng3d.objectprocess.unwatchObject(foo);
    for (var key in foo) {
        foo[key] = ~~foo[key] + 1;
    }
    console.log("watchObject");
    feng3d.objectprocess.watchObject(foo, onChanged);
    for (var key in foo) {
        foo[key] = ~~foo[key] + 1;
    }
    foo.a;
}
function onChanged(object, attribute, oldValue, newValue) {
    console.log(arguments.callee.name, arguments);
}
testWatchObject();
//# sourceMappingURL=objectProcess.js.map