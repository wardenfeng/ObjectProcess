function isBaseType(data) {
    return typeof data == "number" || typeof data == "boolean" || typeof data == "string";
}

function clone<T>(source: T): T {
    if (isBaseType(source))
        return source;
    var prototype: any = source["prototype"] ? source["prototype"] : Object.getPrototypeOf(source);
    var target = new prototype.constructor();
    for (var attribute in source) {
        target[attribute] = source[attribute];
    }
    return target;
}

function merge<T>(source: T, mergeData: Object): T {

    if (isBaseType(mergeData))
        return <any>mergeData;
    var target = clone(source);
    for (var mergeAttribute in mergeData) {
        target[mergeAttribute] = merge(source[mergeAttribute], mergeData[mergeAttribute]);
    }
    return target;
}

function test() {

    var foo = { a: { b: 1 } };
    var bar = merge(foo, { a: { b: 2 } })   // 使用 merge 赋值
    console.log(bar.a.b);  // 像原生 Object 一样取值，打印 2
    console.log(foo.a.b);  // 像原生 Object 一样取值，打印 1
    console.log(foo === bar);  //  打印 false
}

test();