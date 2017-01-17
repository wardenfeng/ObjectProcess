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

    export function watchObject(object: any, onChanged: (object: any, attribute: string, oldValue: any, newValue: any) => void = null) {

        for (var key in object) {
            watch(object, key, onChanged);
        }
    }

    export function watch(object: any, attribute: string, onChanged: (object: any, attribute: string, oldValue: any, newValue: any) => void = null) {

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

    export function unwatchObject(object: any) {

        if (!object.orig)
            return;
        for (var key in object.orig) {
            unwatch(object, key);
        }
        delete object.orig;
    }

    export function unwatch(object: any, attribute: string) {

        Object.defineProperty(object, attribute, {
            value: object.orig[attribute],
            enumerable: true,
            writable: true
        });
    }
}