module feng3d.objectprocess {


    export function isBaseType(data) {
        return typeof data == "number" || typeof data == "boolean" || typeof data == "string";
    }

    export function clone<T>(source: T): T {
        if (isBaseType(source))
            return source;
        var prototype: any = source["prototype"] ? source["prototype"] : Object.getPrototypeOf(source);
        var target = new prototype.constructor();
        for (var attribute in source) {
            target[attribute] = source[attribute];
        }
        return target;
    }

    export function merge<T>(source: T, mergeData: Object): T {

        if (isBaseType(mergeData))
            return <any>mergeData;
        var target = clone(source);
        for (var mergeAttribute in mergeData) {
            target[mergeAttribute] = merge(source[mergeAttribute], mergeData[mergeAttribute]);
        }
        return target;
    }
}