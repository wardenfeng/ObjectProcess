function testMerge() {

    var foo = new Foo();
    var bar = feng3d.objectprocess.merge(foo, { a: { b: 2 } })   // 使用 merge 赋值
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


function testPackAttributes() {

    var foo = { a: 1, b: 2, c: 3 };

    console.log("packAttributes");
    feng3d.objectprocess.packAttributes(foo, onChanged);

    // foo.a = 1;

    for (var key in foo) {
        foo[key] = ~~foo[key] + 1;
    }

    console.log("unpackAttributes");
    feng3d.objectprocess.unpackAttributes(foo);

    for (var key in foo) {
        foo[key] = ~~foo[key] + 1;
    }

    console.log("packAttributes");
    feng3d.objectprocess.packAttributes(foo, onChanged);

    for (var key in foo) {
        foo[key] = ~~foo[key] + 1;
    }

    foo.watch("a", function (id, oldval, newval) {
        console.log('o.' + id + ' changed from ' + oldval + ' to ' + newval);
        return newval;
    });

    foo.a;
}

function onChanged(object: any, attribute: string, oldValue: any, newValue: any) {
    console.log(arguments.callee.name, arguments);
}

testPackAttributes();