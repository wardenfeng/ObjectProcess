declare module feng3d.objectprocess {
    function isBaseType(data: any): boolean;
    function clone<T>(source: T): T;
    function merge<T>(source: T, mergeData: Object): T;
}
declare function testMerge(): void;
declare class Foo {
    a: A;
    b: {
        b0: number;
        b2: number;
    };
    c: number;
}
declare class A {
    b: number;
}
