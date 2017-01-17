declare module feng3d {
    /**
     * 是否为基础类型
     * @param object    对象
     */
    function isBaseType(object: any): boolean;
    /**
     * （浅）克隆
     * @param source        源数据
     * @returns             克隆数据
     */
    function clone<T>(source: T): T;
    /**
     * 合并数据
     * @param source    源数据
     */
    function merge<T>(source: T, mergeData: Object, createNew?: boolean): T;
    function watchObject(object: any, onChanged?: (object: any, attribute: string, oldValue: any, newValue: any) => void): void;
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
declare function onChanged1(object: any, attribute: string, oldValue: any, newValue: any): void;
