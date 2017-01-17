function testMerge() {

    var foo = new Foo();
    var bar = feng3d.merge(foo, { a: { b: 2 } }, true)   // 使用 merge 赋值
    console.log(bar.a.b);  // 像原生 Object 一样取值，打印 2
    console.log(foo.a.b);  // 像原生 Object 一样取值，打印 1
    console.log(foo === bar);  //  打印 false
    console.log(foo.b === bar.b);  //  打印 true
}

class Foo {
    a = new A();
    b = { b0: 1, b2: 2 };
    c = 3;
}

class A {
    b = 1;
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

function onChanged(object: any, attribute: string, oldValue: any, newValue: any) {
    console.log(arguments.callee.name, arguments);
}

function onChanged1(object: any, attribute: string, oldValue: any, newValue: any) {
    console.log(arguments.callee.name, arguments);
}

testWatchObject();