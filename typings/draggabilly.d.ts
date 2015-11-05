// Type definition for Draggabilly

/// <reference path="../jquery/jquery.d.ts" />

/**
 * Declare the module for options and other stuff
 */
declare module Draggabilly {
    // Interface for the draggabilly options
    interface IDraggabillyOptions {
        handle?: any;
        containment?: boolean;
        axis?: string;
        grid?: [number, number];
    }

    // Interface for the movevector
    interface IMoveVector {
        x: number;
        y: number;
    }
}

/**
 * Interface for the main object
 */
interface Draggabilly {
    new (element: any, options: Draggabilly.IDraggabillyOptions);

    // The on methods for usage in VanillaJS
    on(eventName: string, handler: (event: any, pointer: any) => {});
    on(eventName: string, handler: (event: any, pointer: any, moveVector: Draggabilly.IMoveVector) => {});

    // The off methods for usage in VanillaJS
    off(eventName: string, handler: (event: any, pointer: any) => {});
    off(eventName: string, handler: (event: any, pointer: any, moveVector: Draggabilly.IMoveVector) => {});

    // The once methods for usage in VanillaJS
    once(eventName: string, handler: (event: any, pointer: any) => {});
    once(eventName: string, handler: (event: any, pointer: any, moveVector: Draggabilly.IMoveVector) => {});

    // Disable the dragging
    disable();

    // Destroy the draggable object
    destroy();

    // Enable the dragging
    enable();
}

/**
 * Extend the JQuery interface
 */
interface JQuery {
    // Initialize a draggable object
    draggabilly(options: Draggabilly.IDraggabillyOptions): JQuery;

    // Enable, disable or destroy the dragging
    draggabilly(method: string);
}