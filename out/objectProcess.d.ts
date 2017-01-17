declare module feng3d.objectprocess {
    function isBaseType(data: any): boolean;
    function clone<T>(source: T): T;
    function merge<T>(source: T, mergeData: Object): T;
    function watchObject<T>(object: T, onChanged?: (object: T, attribute: string, oldValue: any, newValue: any) => void): void;
    function watch(object: any, attribute: string, onChanged?: (object: any, attribute: string, oldValue: any, newValue: any) => void): void;
    function unwatchObject(object: any): void;
    function unwatch(object: any, attribute: string): void;
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
declare function testWatchObject(): void;
declare function onChanged(object: any, attribute: string, oldValue: any, newValue: any): void;
