var feng3d;
(function (feng3d) {
    /**
     * 是否为基础类型
     * @param object    对象
     */
    function isBaseType(object) {
        return typeof object == "number" || typeof object == "boolean" || typeof object == "string";
    }
    feng3d.isBaseType = isBaseType;
    /**
     * （浅）克隆
     * @param source        源数据
     * @returns             克隆数据
     */
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
    feng3d.clone = clone;
    /**
     * 合并数据
     * @param source    源数据
     */
    function merge(source, mergeData, createNew = false) {
        if (isBaseType(mergeData))
            return mergeData;
        var target = createNew ? clone(source) : source;
        for (var mergeAttribute in mergeData) {
            target[mergeAttribute] = merge(source[mergeAttribute], mergeData[mergeAttribute], createNew);
        }
        return target;
    }
    feng3d.merge = merge;
    function watchObject(object, onChanged = null) {
        if (isBaseType(object))
            return;
        for (var key in object) {
            watch(object, key, onChanged);
        }
    }
    feng3d.watchObject = watchObject;
    function watch(object, attribute, onChanged = null) {
        if (isBaseType(object))
            return;
        if (!object.orig) {
            Object.defineProperty(object, "orig", {
                value: {},
                enumerable: false,
                writable: false,
                configurable: true
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
    feng3d.watch = watch;
    function unwatchObject(object) {
        if (isBaseType(object))
            return;
        if (!object.orig)
            return;
        for (var key in object.orig) {
            unwatch(object, key);
        }
        delete object.orig;
    }
    feng3d.unwatchObject = unwatchObject;
    function unwatch(object, attribute) {
        if (isBaseType(object))
            return;
        Object.defineProperty(object, attribute, {
            value: object.orig[attribute],
            enumerable: true,
            writable: true
        });
    }
    feng3d.unwatch = unwatch;
})(feng3d || (feng3d = {}));
function testMerge() {
    var foo = new Foo();
    var bar = feng3d.merge(foo, { a: { b: 2 } }, true); // 使用 merge 赋值
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
    var foo = new Foo();
    console.log("watchObject");
    feng3d.watchObject(foo, onChanged);
    feng3d.watchObject(foo, onChanged1);
    // foo.a = 1;
    for (var key in foo) {
        if (typeof foo[key] == "number")
            foo[key] = ~~foo[key] + 1;
    }
    console.log("unwatchObject");
    feng3d.unwatchObject(foo);
    for (var key in foo) {
        if (typeof foo[key] == "number")
            foo[key] = ~~foo[key] + 1;
    }
    console.log("watchObject");
    feng3d.watchObject(foo, onChanged);
    for (var key in foo) {
        if (typeof foo[key] == "number")
            foo[key] = ~~foo[key] + 1;
    }
    foo.a;
}
function onChanged(object, attribute, oldValue, newValue) {
    console.log(arguments.callee.name, arguments);
}
function onChanged1(object, attribute, oldValue, newValue) {
    console.log(arguments.callee.name, arguments);
}
testWatchObject();
//# sourceMappingURL=objectExtension.js.map