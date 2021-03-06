module feng3d {

    /**
     * 是否为基础类型
     * @param object    对象  
     */
    export function isBaseType(object: any) {
        return typeof object == "number" || typeof object == "boolean" || typeof object == "string";
    }

    /**
     * （浅）克隆
     * @param source        源数据
     * @returns             克隆数据
     */
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

    /**
     * 合并数据
     * @param source        源数据
     * @param mergeData     合并数据
     * @param createNew     是否合并为新对象，默认为false
     * @returns             如果createNew为true时返回新对象，否则返回源数据
     */
    export function merge<T>(source: T, mergeData: Object, createNew = false): T {

        if (isBaseType(mergeData))
            return <any>mergeData;
        var target = createNew ? clone(source) : source;
        for (var mergeAttribute in mergeData) {
            target[mergeAttribute] = merge(source[mergeAttribute], mergeData[mergeAttribute], createNew);
        }
        return target;
    }

    /**
     * 观察对象
     * @param object        被观察的对象
     * @param onChanged     属性值变化回调函数
     */
    export function watchObject(object: any, onChanged: (object: any, attribute: string, oldValue: any, newValue: any) => void = null) {

        if (isBaseType(object))
            return;
        for (var key in object) {
            watch(object, key, onChanged);
        }
    }

    /**
     * 观察对象中属性
     * @param object        被观察的对象
     * @param attribute     被观察的属性
     * @param onChanged     属性值变化回调函数
     */
    export function watch(object: any, attribute: string, onChanged: (object: any, attribute: string, oldValue: any, newValue: any) => void = null) {

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

    /**
     * 取消观察对象
     * @param object        被观察的对象
     */
    export function unwatchObject(object: any) {

        if (isBaseType(object))
            return;
        if (!object.orig)
            return;
        for (var key in object.orig) {
            unwatch(object, key);
        }
        delete object.orig;
    }

    /**
     * 取消观察对象中属性
     * @param object        被观察的对象
     * @param attribute     被观察的属性
     */
    export function unwatch(object: any, attribute: string) {

        if (isBaseType(object))
            return;
        Object.defineProperty(object, attribute, {
            value: object.orig[attribute],
            enumerable: true,
            writable: true
        });
    }
}