import { ipcRenderer, IpcMessageEvent } from "electron";
import ProxyResult from "./ProxyResult";
const getProxyForChannel = <T extends object>(channel: string): T => {
    let callId = 0;
    interface PromiseResolver {
        resolve: Function;
        reject: Function;
    }
    let returnMap: Map<number, PromiseResolver> = new Map<number, PromiseResolver>();
    const handler: ProxyHandler<T> = {
        get: (_, propKey) => (...args: any[]) => {
            const thisCallId = callId++;
            ipcRenderer.send(channel, thisCallId, propKey, ...args);
            return new Promise((resolve, reject) => {
                returnMap.set(thisCallId, { resolve, reject });
            });
        }
    };
    ipcRenderer.on(channel, (_: IpcMessageEvent, { callId, result, error }: ProxyResult<any>) => {
        if (!returnMap.has(callId)) {
            throw Error(`could not find callId ${callId} in returnMap`);
        }
        const resolver = returnMap.get(callId);
        if (resolver) {
            if (error) {
                resolver.reject(error);
            }
            else {
                resolver.resolve(result);
            }
        }
        returnMap.delete(callId);
    });
    const proxy = new Proxy<T>({} as T, handler);
    return proxy;
};
export default getProxyForChannel