import { NextFunction } from "express";
import { HttpMethod } from "../enums";
import { controller } from "../interfaces";
import { HttpMethods } from "../types";

// v1 approach that didn't take advantage of oop
// function defineEndpoint(route: string, method: HttpMethods) {
//     return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
//         const controller = target.constructor as unknown as controller;
//         controller.endpoints[route] = {
//             method,
//             handler: descriptor.value
//         };
//     };
// }

function defineEndpoint(route: string, method: HttpMethods) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const controllerClass = target.constructor;
        let instance: any;
        controllerClass.endpoints[route] = {
            method,
            handler: function (req: Request, res: Response, next: NextFunction) {
                if (!instance) {
                    instance = new controllerClass();
                }
                return descriptor.value.call(instance, req, res, next);
            }
        };
    };
}

export function Get(route: string) {
    return defineEndpoint(route, 'get');
}

export function Post(route: string) {
    return defineEndpoint(route, 'post');
}

export function Delete(route: string) {
    return defineEndpoint(route, 'delete');
}

export function Patch(route: string) {
    return defineEndpoint(route, 'patch');
}

export function Put(route: string) {
    return defineEndpoint(route, 'put');
}
