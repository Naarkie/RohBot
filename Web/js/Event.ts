﻿
interface Event2<T1, T2> extends IEvent {
    add(listener: (arg1: T1, arg2: T2) => void): void;
    remove(listener: (arg1: T1, arg2: T2) => void): void;
    trigger(arg1: T1, arg2: T2): void;
}

interface Event1<T> extends IEvent {
    add(listener: (arg: T) => void): void;
    remove(listener: (arg: T) => void): void;
    trigger(arg: T): void;
}

interface Event0 extends IEvent {
    add(listener: () => void): void;
    remove(listener: () => void): void;
    trigger(): void;
}

interface IEvent {
    add(listener: () => void): void;
    remove(listener: () => void): void;
    trigger(...a: any[]): void;
}

class TypedEvent implements IEvent {
    private listeners: any[] = [];

    public add(listener: () => void) {
        this.listeners.push(listener);
    }
    public remove(listener?: () => void) {
        if (typeof listener === 'function') {
            for (var i = 0, l = this.listeners.length; i < l; l++) {
                if (this.listeners[i] === listener) {
                    this.listeners.splice(i, 1);
                    break;
                }
            }
        } else {
            this.listeners = [];
        }
    }

    public trigger(...a: any[]) {
        var context = {};
        var listeners = this.listeners.slice(0);
        for (var i = 0, l = listeners.length; i < l; i++) {
            listeners[i].apply(context, a || []);
        }
    }
}
